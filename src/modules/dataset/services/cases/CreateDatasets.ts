import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { NotExistFieldError, chaca } from "chaca";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { MultiGenerateSchema } from "chaca";
import { SchemaLimit, SchemaName } from "../value_object/schema_config";
import { ChacaSchemaBuilder } from "./ChacaSchemaBuilder";
import {
  DatasetCreationError,
  RepeatDatasetNameException,
} from "@modules/dataset/exceptions";

export class CreateDatasets {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetsConfig: Array<InputDatasetDTO>) {
    const multiGenerateConfig = this.buildSchemas(datasetsConfig);

    try {
      const allData = chaca.multiGenerate(multiGenerateConfig, {
        verbose: false,
      });

      return allData;
    } catch (error) {
      if (error instanceof NotExistFieldError) {
        throw new DatasetCreationError(error.message);
      } else {
        throw error;
      }
    }
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

      this.validateNotRepeatDatasetName(
        datasetName,
        multiGenerateConfig.map((d) => d.name),
      );

      multiGenerateConfig.push({
        name: datasetName,
        schema: datasetSchema,
        documents: documentsLimit,
      });
    }

    return multiGenerateConfig;
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
