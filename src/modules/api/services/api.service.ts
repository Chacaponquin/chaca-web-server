import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { DatasetGeneratorService } from "@modules/socket/modules/dataset_generator/services/dataset_generator.service";
import { Injectable } from "@nestjs/common";
import { SchemaConfigDTO } from "../dto/schemaConfig.dto";
import { GetSchemaObject, GetValueBySchemaOption } from "./cases";

@Injectable()
export class ApiService {
  constructor(
    private readonly schemaOptionsService: SchemaOptionsService,
    private readonly datasetGeneratorService: DatasetGeneratorService,
  ) {}

  public getValueBySchemaOption(
    schema: string,
    option: string,
    optionConfig: Record<string, string>,
  ) {
    const useCase = new GetValueBySchemaOption(this.schemaOptionsService);
    return useCase.execute(schema, option, optionConfig);
  }

  public getSchemaObject(schemaConfig: SchemaConfigDTO) {
    const useCase = new GetSchemaObject();
    return useCase.execute(schemaConfig);
  }
}
