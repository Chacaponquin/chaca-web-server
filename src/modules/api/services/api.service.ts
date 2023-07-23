import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { Injectable } from "@nestjs/common";
import { GetSchemaObject, GetValueBySchemaOption } from "./cases";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SimpleSchemaConfig } from "../dto/schema_config";

@Injectable()
export class ApiService {
  constructor(
    private readonly schemaOptionsService: SchemaOptionsService,
    private readonly datasetService: DatasetService,
  ) {}

  public getValueBySchemaOption(
    schema: string,
    option: string,
    optionConfig: Record<string, string>,
  ) {
    const useCase = new GetValueBySchemaOption(this.schemaOptionsService);
    return useCase.execute(schema, option, optionConfig);
  }

  public getSchemaObject(schemaConfig: SimpleSchemaConfig) {
    const useCase = new GetSchemaObject(this.datasetService);
    return useCase.execute(schemaConfig);
  }
}
