import { SimpleSchemaConfig } from "@modules/api/dto/schema_config";
import { SchemaInput } from "@modules/api/services/value-object";
import { DatasetService } from "@modules/dataset/services/dataset.service";

export class GetSchemaObject {
  constructor(private readonly datasetService: DatasetService) {}

  async execute(schemaConfigInput?: SimpleSchemaConfig) {
    const schemaFields = new SchemaInput(schemaConfigInput).fields();
    const schema = this.datasetService.buildSchema(schemaFields);

    return await schema.genObject();
  }
}
