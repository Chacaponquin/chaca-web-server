import { schemas } from "chaca";
import { Socket } from "socket.io";
import { ChacaDatasetError } from "../../errors/ChacaDatasetError";
import {
  ArrayResultNode,
  ChacaResultDatasetTree,
  DocumentTree,
  FieldNode,
  MixedFieldNode,
  ResultFieldNode,
} from "../ResultTree";
import {
  Node,
  RefValueNode,
  SchemaValueNode,
  ChacaDatasetTree,
  MixedValueNode,
  CustomValueNode,
} from "../Tree";
import { SOCKET_EVENTS } from "@modules/socket/constants/SOCKET_EVENTS.enum";
import { ReturnDataset } from "@modules/socket/interfaces/dataset.interface";

export class DatasetsGenerator {
  private resultDatasets: Array<ChacaResultDatasetTree> = [];

  private documentsToCreate = 0;
  private documentsCreated = 0;

  constructor(
    private readonly socket: Socket,
    private readonly datasetTrees: Array<ChacaDatasetTree>,
  ) {
    // crear y añadir el arbol de solucion del dataset
    this.datasetTrees.forEach((d) => {
      this.resultDatasets.push(new ChacaResultDatasetTree(d.id, d.name));
      this.datasetTrees.forEach((d) => (this.documentsToCreate += d.limit));
    });
  }

  public createData(): Array<ReturnDataset<unknown>> {
    // recorrer todos los datasets
    for (const dat of this.datasetTrees) {
      // dataset solution con la misma id de la dataset actual
      const datasetSolution = this.resultDatasets.find(
        (d) => d.id === dat.id,
      ) as ChacaResultDatasetTree;

      // segun el limite del dataset crear cada documento
      for (let indexDoc = 0; indexDoc < dat.limit; indexDoc++) {
        // create new document
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

        // actualizar el porciento de documentos por terminar y enviarlo al cliente
        this.updateFinishPorcent();
      }
    }

    return this.resultDatasets.map((d) => d.getDatasetObject());
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
      const limit = schemas.dataType
        .int()
        .getValue({ min: field.isArray.min, max: field.isArray.max });

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

  private updateFinishPorcent(): void {
    // calcular el porciento de completado
    const porcent = (this.documentsCreated * 100) / this.documentsToCreate;

    // enviar porciento al cliente
    this.socket.emit(SOCKET_EVENTS.DOCUMENT_CREATED, porcent);

    // incrementar el contador de documentos creados
    this.documentsCreated += 1;
  }
}
