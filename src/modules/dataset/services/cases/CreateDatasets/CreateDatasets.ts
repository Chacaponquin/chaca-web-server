import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { ChacaSchema, chaca } from "chaca";
import {
  CustomValueField,
  DefinedValueField,
  ISchemaField,
  RefValueField,
} from "./value_object/ValueFields";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE.enum";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { IncorrectDefinedFieldDataTypeException } from "@modules/dataset/exceptions";
import { SchemaInputField, MultiGenerateSchema } from "chaca";
import { SchemaLimit, SchemaName } from "./value_object";

export class CreateDatasets {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetsConfig: Array<InputDatasetDTO>) {
    const multiGenerateConfig: Array<MultiGenerateSchema> = [];
    for (const dataset of datasetsConfig) {
      const documentsLimit = new SchemaLimit(dataset.limit).value;
      const datasetSchema = this.buildChacaSchema(dataset);
      const datasetName = new SchemaName(dataset.name).value;

      multiGenerateConfig.push({
        name: datasetName,
        schema: datasetSchema,
        documents: documentsLimit,
      });
    }

    const allData = chaca.multiGenerate(multiGenerateConfig, {
      verbose: false,
    });

    return allData;
  }

  private buildChacaSchema(datasetConfig: InputDatasetDTO): ChacaSchema {
    let schemaFields: Record<string, SchemaInputField> = {};

    for (const field of datasetConfig.fields) {
      const fieldName = field.name;

      const fieldType = this.mapDataTypeToField(field.dataType).getField();

      const fieldConfig = {
        type: fieldType,
        isArray: field.isArray,
        posibleNull: field.isPosibleNull,
      } as SchemaInputField;

      schemaFields = {
        ...schemaFields,
        [fieldName]: fieldConfig,
      };
    }

    return chaca.schema(schemaFields);
  }

  private mapDataTypeToField(dataType: FieldDataType): ISchemaField {
    if (dataType.type === DATA_TYPES.SINGLE_VALUE) {
      return new DefinedValueField(
        this.schemaOptionsServices,
        dataType.fieldType,
      );
    } else if (dataType.type === DATA_TYPES.REF) {
      return new RefValueField(dataType.ref);
    } else if (dataType.type === DATA_TYPES.CUSTOM) {
      return new CustomValueField(dataType.code);
    } else if (dataType.type === DATA_TYPES.MIXED) {
    } else {
      throw new IncorrectDefinedFieldDataTypeException();
    }
  }
}
