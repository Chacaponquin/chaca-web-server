import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { MultiGenerateSchema } from "chaca";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { SchemaLimit, SchemaName } from "../value_object/schema-config";
import { ChacaSchemaBuilder } from "./ChacaSchemaBuilder";
import { RepeatDatasetNameException } from "@modules/dataset/exceptions/dataset";
import { MultiSchema } from "../value_object/schemas";

export class CreateDatasets {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetsConfig: Array<InputDatasetDTO>) {
    const multi = this.buildSchemas(datasetsConfig);
    return multi.generate();
  }

  public buildSchemas(datasetsConfig: Array<InputDatasetDTO>): MultiSchema {
    const multiGenerateConfig: Array<MultiGenerateSchema> = [];

    for (const dataset of datasetsConfig) {
      const builder = new ChacaSchemaBuilder(this.schemaOptionsServices);

      const documentsLimit = new SchemaLimit(dataset.limit).value;
      const datasetSchema = builder.execute(dataset.fields);
      const datasetName = new SchemaName(dataset.name).value;

      this.validateNotRepeatDatasetName(
        datasetName,
        multiGenerateConfig.map((d) => d.name),
      );

      multiGenerateConfig.push({
        name: datasetName,
        schema: datasetSchema.schema,
        documents: documentsLimit,
      });
    }

    return new MultiSchema(multiGenerateConfig);
  }

  private validateNotRepeatDatasetName(
    name: string,
    allSchemas: Array<string>,
  ): void {
    if (allSchemas.some((s) => s === name)) {
      throw new RepeatDatasetNameException(
        `Aldready exists a schema with the name "${name}"`,
      );
    }
  }
}
