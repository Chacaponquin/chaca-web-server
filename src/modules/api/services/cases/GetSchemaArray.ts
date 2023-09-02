import { CompleteSchemaConfig } from "@modules/api/dto/schema_config";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaLimit } from "@modules/dataset/services/value_object/schema_config";
import { SchemaInput } from "../value-object";

export class GetSchemaArray {
  constructor(private readonly datasetService: DatasetService) {}

  public execute(schemaConfig: CompleteSchemaConfig) {
    const schemaFields = new SchemaInput(schemaConfig.schema).fields();
    const count = new SchemaLimit(schemaConfig.count).value;
    const schema = this.datasetService.buildSchema(schemaFields);

    return schema.generate(count);
  }
}
