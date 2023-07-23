import { Injectable } from "@nestjs/common";
import { InputDatasetDTO, InputDatasetFieldDTO } from "../dto/dataset";
import {
  ChacaSchemaBuilder,
  CreateAndExportDatasets,
  CreateDatasets,
} from "./cases";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ChacaSchema } from "chaca";
import { FileConfigDTO } from "../dto/file";

@Injectable()
export class DatasetService {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public createDatasets(datasetsConfig: Array<InputDatasetDTO>) {
    const useCase = new CreateDatasets(this.schemaOptionsServices);
    return useCase.execute(datasetsConfig);
  }

  public buildSchema(datasetFields: Array<InputDatasetFieldDTO>): ChacaSchema {
    const useCase = new ChacaSchemaBuilder(this.schemaOptionsServices);
    return useCase.execute(datasetFields);
  }

  public async createAndExportDatasets(
    datasetsConfig: Array<InputDatasetDTO>,
    fileConfig: FileConfigDTO,
  ): Promise<string> {
    const useCase = new CreateAndExportDatasets(this.schemaOptionsServices);
    return await useCase.execute(datasetsConfig, fileConfig);
  }
}
