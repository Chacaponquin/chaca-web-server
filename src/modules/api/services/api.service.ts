import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { Injectable } from "@nestjs/common";
import {
  GetSchemaArray,
  GetSchemaObject,
  GetValueBySchemaOption,
} from "./cases";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { CompleteSchemaConfig, SimpleSchemaConfig } from "../dto/schema_config";

type SchemaValueParams = {
  schema: string;
  option: string;
  optionConfig?: Record<string, unknown>;
};

@Injectable()
export class ApiService {
  constructor(
    private readonly schemaOptionsService: SchemaOptionsService,
    private readonly datasetService: DatasetService,
  ) {}

  public getValueBySchemaOption({
    option,
    optionConfig = {},
    schema,
  }: SchemaValueParams) {
    const useCase = new GetValueBySchemaOption(this.schemaOptionsService);
    return useCase.execute(schema, option, optionConfig);
  }

  public getSchemaObject(schemaConfig: SimpleSchemaConfig) {
    const useCase = new GetSchemaObject(this.datasetService);
    return useCase.execute(schemaConfig);
  }

  public getSchemaArray(schemaConfig: CompleteSchemaConfig) {
    const useCase = new GetSchemaArray(this.datasetService);
    return useCase.execute(schemaConfig);
  }
}
