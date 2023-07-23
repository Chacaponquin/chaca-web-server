import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { chaca } from "chaca";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { MultiGenerateSchema } from "chaca";
import { SchemaLimit, SchemaName } from "../value_object";
import { ChacaSchemaBuilder } from "./ChacaSchemaBuilder";

export class CreateDatasets {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetsConfig: Array<InputDatasetDTO>) {
    const multiGenerateConfig = this.buildSchemas(datasetsConfig);
    const allData = chaca.multiGenerate(multiGenerateConfig, {
      verbose: false,
    });

    return allData;
  }

  public buildSchemas(
    datasetsConfig: Array<InputDatasetDTO>,
  ): Array<MultiGenerateSchema> {
    const multiGenerateConfig: Array<MultiGenerateSchema> = [];
    for (const dataset of datasetsConfig) {
      const schemaBuilder = new ChacaSchemaBuilder(this.schemaOptionsServices);

      const documentsLimit = new SchemaLimit(dataset.limit).value;
      const datasetSchema = schemaBuilder.execute(dataset.fields);
      const datasetName = new SchemaName(dataset.name).value;

      multiGenerateConfig.push({
        name: datasetName,
        schema: datasetSchema,
        documents: documentsLimit,
      });
    }

    return multiGenerateConfig;
  }
}
