import { Injectable } from "@nestjs/common";
import { InputDatasetDTO, InputDatasetFieldDTO } from "../dto/dataset";
import { ChacaSchemaBuilder, CreateDatasets } from "./cases";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ChacaSchema } from "chaca";

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
}
