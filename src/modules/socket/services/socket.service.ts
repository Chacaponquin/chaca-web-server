import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ChacaDatasetTree } from "../classes/Tree";
import { InputDataset } from "../dto/datasetsDTO.dto";
import { ChacaDatasetError } from "../errors/ChacaDatasetError";

@Injectable()
export class SocketService {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

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
