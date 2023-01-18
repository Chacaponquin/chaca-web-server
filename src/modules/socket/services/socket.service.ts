import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

import { ChacaDatasetTree } from "../classes/Tree";
import { DATA_TYPES } from "../constants/DATA_TYPE.enum";
import { InputDataset, InputDatasetField } from "../dto/datasetsDTO.dto";
import { ChacaDatasetError } from "../errors/ChacaDatasetError";
import { FieldDataType } from "../interfaces/dataType.interface";

@Injectable()
export class SocketService {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}
  private createFieldModelObject(field: InputDatasetField<FieldDataType>) {
    if (field.dataType.type === DATA_TYPES.MIXED) {
      return {
        isArray: field.isArray,
        isPossibleNull: field.isPosibleNull,
        dataType: {
          type: field.dataType.type,
          object: field.dataType.object.map((o) =>
            this.createFieldModelObject(o),
          ),
        },
      };
    } else {
      return {
        isArray: field.isArray,
        dataType: field.dataType,
        isPossibleNull: field.isPosibleNull,
      };
    }
  }

  createDatasetModelObject(inputDataset: InputDataset) {
    let returnModel = {};

    for (const field of inputDataset.fields) {
      returnModel = {
        ...returnModel,
        [field.name]: this.createFieldModelObject(field),
      };
    }

    return returnModel;
  }

  createDatasetsTrees(
    inputDatasets: Array<InputDataset>,
  ): Array<ChacaDatasetTree> {
    const datasetsTrees = [] as Array<ChacaDatasetTree>;

    if (!Array.isArray(inputDatasets))
      throw new ChacaDatasetError(`Your datasets must be an array`);

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

      datasetsTrees.push(newDatTree);
    }

    return datasetsTrees;
  }
}
