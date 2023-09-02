import { SimpleSchemaConfig } from "@modules/api/dto/schema_config";
import { SchemaInput } from "@modules/api/services/value-object";
import { DatasetService } from "@modules/dataset/services/dataset.service";

export class GetSchemaObject {
  constructor(private readonly datasetService: DatasetService) {}

  public execute(schemaConfigInput?: SimpleSchemaConfig) {
    const schemaFields = new SchemaInput(schemaConfigInput).fields();
    const schema = this.datasetService.buildSchema(schemaFields);

    return schema.generateObject();
  }
}
