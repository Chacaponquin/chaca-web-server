import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { SchemaLimit, SchemaName } from "../value_object/schema-config";
import { ChacaSchemaBuilder } from "./ChacaSchemaBuilder";
import { MultiGenerateSchema } from "chaca";
import { MultiSchema } from "../value_object/schemas";
import { RepeatDatasetNameException } from "@modules/dataset/exceptions/dataset";
import { InputDatasetDTO } from "@modules/dataset/dto/dataset";

export class BuildSchemas {
  private readonly builder = new ChacaSchemaBuilder(this.schemaOptionsServices);

  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetsConfig: Array<InputDatasetDTO>) {
    const multiGenerateConfig: Array<MultiGenerateSchema> = [];

    for (const dataset of datasetsConfig) {
      const documentsLimit = new SchemaLimit(dataset.limit).value;
      const datasetSchema = this.builder.execute(dataset.fields);
      const datasetName = new SchemaName(dataset.name).value;

      this._validateNotRepeatDatasetName(
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

  private _validateNotRepeatDatasetName(
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
