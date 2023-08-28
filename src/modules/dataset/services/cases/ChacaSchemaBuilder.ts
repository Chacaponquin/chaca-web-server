import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { IncorrectDefinedFieldDataTypeException } from "@modules/dataset/exceptions";
import {
  CustomValueField,
  DefinedValueField,
  FieldIsArray,
  FieldName,
  FieldPosibleNull,
  ISchemaField,
  MixedValueField,
  RefValueField,
} from "@modules/dataset/services/value_object";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ChacaSchema, SchemaInputField, chaca } from "chaca";

export class ChacaSchemaBuilder {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetFields: Array<InputDatasetFieldDTO>): ChacaSchema {
    let schemaFields: Record<string, SchemaInputField> = {};

    for (const field of datasetFields) {
      const fieldName = new FieldName(field.name).value;
      const fieldType = this.mapDataTypeToField(field.dataType).getField();
      const fieldIsArray = new FieldIsArray(field.isArray).value;
      const fieldPosibleNull = new FieldPosibleNull(field.isPosibleNull).value;

      const fieldConfig = {
        type: fieldType,
        isArray: fieldIsArray,
        posibleNull: fieldPosibleNull,
      } as SchemaInputField;

      schemaFields = {
        ...schemaFields,
        [fieldName]: fieldConfig,
      };
    }

    const schema = chaca.schema(schemaFields);
    return schema;
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
      const schema = this.execute(dataType.object);
      return new MixedValueField(schema);
    } else {
      throw new IncorrectDefinedFieldDataTypeException(
        `The field must have a dataType.`,
      );
    }
  }
}
