import { ConfigIsArray } from "@modules/dataset/dto/field";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import {
  ArrayResultNode,
  ChacaResultDatasetTree,
  DocumentTree,
  FieldNode,
  MixedFieldNode,
  ResultFieldNode,
} from "@modules/socket/modules/dataset_generator/classes/ResultTree";
import {
  ChacaDatasetTree,
  CustomValueNode,
  MixedValueNode,
  RefValueNode,
  SchemaValueNode,
  Node,
} from "@modules/socket/modules/dataset_generator/classes/Tree";
import { InputDataset } from "@modules/socket/dto/datasetsDTO.dto";
import { ChacaDatasetError } from "@modules/socket/errors/ChacaDatasetError";
import { ReturnDataset } from "@modules/socket/modules/dataset_generator/interfaces/dataset.interface";
import { Injectable } from "@nestjs/common";
import { schemas } from "chaca";
import { FIELD_MAX_ARRAY_LIMIT } from "../../../../dataset/constants/FIELD_LIMITS";

@Injectable()
export class DatasetGeneratorService {
  private documentsToCreate = 0;
  private documentsCreated = 0;

  private datasetTrees: Array<ChacaDatasetTree> = [];
  private resultDatasets: Array<ChacaResultDatasetTree> = [];

  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  public createData(
    inputDatasets: Array<InputDataset>,
  ): [Array<ReturnDataset>, Array<ChacaDatasetTree>] {
    this.createDatasetsTrees(inputDatasets);

    // recorrer todos los datasets
    for (const dat of this.datasetTrees) {
      // dataset solution con la misma id de la dataset actual
      const datasetSolution = this.resultDatasets.find(
        (d) => d.id === dat.id,
      ) as ChacaResultDatasetTree;

      // resolve dataset
      this.resolveDataset(datasetSolution, dat);
    }

    return [
      this.resultDatasets.map((d) => d.getDatasetObject()),
      this.datasetTrees,
    ];
  }

  public createDataset(inputDat: InputDataset): Array<unknown> {
    const resultDataset = new ChacaResultDatasetTree(
      inputDat.id,
      inputDat.name,
    );

    const newDatTree = new ChacaDatasetTree(
      inputDat.id,
      inputDat.name,
      inputDat.limit,
    );

    newDatTree.insertDatasetsFields(
      inputDat.fields,
      this.schemaOptionsService.getSchemas(),
    );

    this.resolveDataset(resultDataset, newDatTree);

    return resultDataset.getDatasetObject().documents;
  }

  private createDatasetsTrees(inputDatasets: Array<InputDataset>): void {
    if (!Array.isArray(inputDatasets)) {
      throw new ChacaDatasetError(`Your datasets must be an array`);
    }

    for (const inputDat of inputDatasets) {
      // crear el arbol del dataset
      const newDatTree = new ChacaDatasetTree(
        inputDat.id,
        inputDat.name,
        inputDat.limit,
      );

      // insertar todos los fields del dataset dentro del arbol
      newDatTree.insertDatasetsFields(
        inputDat.fields,
        this.schemaOptionsService.getSchemas(),
      );

      this.datasetTrees.push(newDatTree);
    }

    // crear y añadir el arbol de solucion del dataset
    this.datasetTrees.forEach((d) => {
      this.resultDatasets.push(new ChacaResultDatasetTree(d.id, d.name));
      this.datasetTrees.forEach((d) => (this.documentsToCreate += d.limit));
    });
  }

  private validateDatasetLimitDocs(lim: number): number {
    let limit = 1;

    if (typeof lim === "number" && lim > 0 && lim <= 300) {
      limit = lim;
    }

    return limit;
  }

  private resolveDataset(
    datasetSolution: ChacaResultDatasetTree,
    dat: ChacaDatasetTree,
  ): void {
    const limit = this.validateDatasetLimitDocs(dat.limit);

    // segun el limite del dataset crear cada documento
    for (let indexDoc = 0; indexDoc < limit; indexDoc++) {
      // create empty new document
      const newDocument = new DocumentTree();

      // insertar el nuevo documento en la datasetSolution
      datasetSolution.insertDocument(newDocument);

      // recorrer los fields del dataset actual para crear cada uno en el documento que le pertenece
      for (const datField of dat.fields) {
        const fieldSolutionNode = this.createSolutionNodeByType(
          datasetSolution,
          datField,
          indexDoc,
        );

        // insertar la solucion del field en el documento
        newDocument.insertNode(fieldSolutionNode);

        // resolver el field actual en caso de ser un array o un mixed
        this.resolveArrayAndMixedFields(
          datasetSolution,
          datField,
          fieldSolutionNode,
          indexDoc,
        );
      }
    }
  }

  private resolveArrayAndMixedFields(
    datasetSolution: ChacaResultDatasetTree,
    field: Node,
    fieldSolution: FieldNode,
    indexDoc: number,
  ) {
    // en caso de que sea un mixed field
    if (
      field instanceof MixedValueNode &&
      fieldSolution instanceof MixedFieldNode
    ) {
      this.createMixedSubFields(
        datasetSolution,
        fieldSolution,
        field,
        indexDoc,
      );
    }

    // en caso de que sea un array field
    else if (fieldSolution instanceof ArrayResultNode) {
      this.createArrayFieldSolution(
        datasetSolution,
        fieldSolution,
        field,
        indexDoc,
      );
    }
  }

  private createMixedSubFields(
    datasetSolution: ChacaResultDatasetTree,
    solutionMixedNode: MixedFieldNode,
    field: MixedValueNode,
    indexDoc: number,
  ): void {
    for (const f of field.nodes) {
      // filtrar el subField segun su tipo
      const subFieldSolutionNode = this.createSolutionNodeByType(
        datasetSolution,
        f,
        indexDoc,
      );

      // insertar la solucion del field en la solucion del mixed field pasado por parametro
      solutionMixedNode.insertNode(subFieldSolutionNode);

      // resolver el subField en caso de ser un array o un mixed field
      this.resolveArrayAndMixedFields(
        datasetSolution,
        f,
        subFieldSolutionNode,
        indexDoc,
      );
    }
  }

  private createArrayFieldSolution(
    datasetSolution: ChacaResultDatasetTree,
    solutionArrayNode: ArrayResultNode,
    field: Node,
    indexDoc: number,
  ) {
    if (field.isArray) {
      // limite del arreglo de valores
      const limit = this.validateFieldIsArrayLimit(field.isArray);

      // resolver el field hasta llegar al limite del array
      for (let arrayIndex = 0; arrayIndex < limit; arrayIndex++) {
        // resolver el field y guardarlo en un nodo
        const fieldSolutionNode = this.createSolutionNodeByType(
          datasetSolution,
          field.getNoArrayNode(),
          indexDoc,
        );

        // insertar el field en el array de soluciones
        solutionArrayNode.insertNode(fieldSolutionNode);

        // resolver el field en caso de ser un mixed field
        this.resolveArrayAndMixedFields(
          datasetSolution,
          field,
          fieldSolutionNode,
          indexDoc,
        );
      }
    }
  }

  public validateFieldIsArrayLimit(isArray?: ConfigIsArray): number {
    let limit = schemas.dataType.int().getValue({ min: 0, max: 10 });

    if (isArray) {
      if (
        typeof isArray === "number" &&
        isArray >= 0 &&
        isArray <= FIELD_MAX_ARRAY_LIMIT
      ) {
        limit = isArray;
      } else if (typeof isArray === "object") {
        const max =
          isArray.max <= FIELD_MAX_ARRAY_LIMIT
            ? isArray.max
            : FIELD_MAX_ARRAY_LIMIT;

        limit = schemas.dataType.int().getValue({ min: isArray.min, max });
      }
    }

    return limit;
  }

  public validateIsPosibleNull(isPosibleNull?: number): number {
    let is = 0;

    if (
      typeof isPosibleNull === "number" &&
      isPosibleNull >= 0 &&
      isPosibleNull <= 100
    ) {
      is = isPosibleNull;
    }

    return is;
  }

  private createSolutionNodeByType(
    datasetSolution: ChacaResultDatasetTree,
    field: Node,
    indexDoc: number,
  ): FieldNode {
    // en caso de ser un array
    if (field.isArray) {
      return new ArrayResultNode(field.fieldConfig, field);
    }

    // en caso de no ser un array
    else {
      // en caso de ser un schema field
      if (field instanceof SchemaValueNode) {
        return new ResultFieldNode(field.fieldConfig, field.getValue());
      }

      // en caso de ser un custom field
      else if (field instanceof CustomValueNode) {
        // obtener el valor de la funcion pasando como parametro el documento actual del ciclo
        const value = field.getValue(
          datasetSolution.getDocumentObject(indexDoc),
        );
        return new ResultFieldNode(field.fieldConfig, value);
      }

      // en caso de ser un ref field
      else if (field instanceof RefValueNode) {
        // se busca en los datasets creados el que coincida con el primer parametro del ref
        const findDatasetRef = this.resultDatasets.find(
          (d) => d.name === field.ref[0],
        );

        if (findDatasetRef) {
          // se obtienen todos los valores del fiel a referenciar de todos los fields del dataset encontrado
          // y se escoge uno que sera del que se referencie
          const refValue = findDatasetRef.getRefFieldValue(field.ref.slice(1));
          return new ResultFieldNode(field.fieldConfig, refValue);
        } else {
          throw new ChacaDatasetError(
            `Error while reference field ${field.name}`,
          );
        }
      }

      // en caso de ser un mixed field
      else if (field instanceof MixedValueNode) {
        return new MixedFieldNode(field.fieldConfig);
      }

      // en caso de no ser ninguno de los anteriores
      else {
        throw new ChacaDatasetError(
          `${field.name} has an invalid method of solution`,
        );
      }
    }
  }
}
