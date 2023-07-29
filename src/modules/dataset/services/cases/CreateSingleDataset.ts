import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { ChacaSchemaBuilder } from "./ChacaSchemaBuilder";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

export class CreateSingleDataset {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  public execute(datasetFields: Array<InputDatasetFieldDTO>) {
    const schemaBuilder = new ChacaSchemaBuilder(this.schemaOptionsService);
    const schema = schemaBuilder.execute(datasetFields);
    return schema.generateObject();
  }
}
