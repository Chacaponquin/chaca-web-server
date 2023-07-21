import { Injectable } from "@nestjs/common";
import { InputDatasetDTO } from "../dto/dataset";
import { CreateDatasets } from "./cases";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

@Injectable()
export class DatasetService {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public async createDatasets(datasetsConfig: Array<InputDatasetDTO>) {
    const useCase = new CreateDatasets(this.schemaOptionsServices);
    return useCase.execute(datasetsConfig);
  }
}
