import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { IncorrectDefinedFieldDataTypeException } from "@modules/dataset/exceptions";
import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ChacaSchema, SchemaInputField, chaca } from "chaca";
import {
  FieldIsArray,
  FieldName,
  FieldPosibleNull,
} from "../value_object/field_config";
import {
  CustomValueField,
  DefinedValueField,
  EnumValueField,
  MixedValueField,
  RefValueField,
  SequenceValueField,
  SequentialValueField,
} from "../value_object/field_type";

export class ChacaSchemaBuilder {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetFields: Array<InputDatasetFieldDTO>): ChacaSchema {
    let schemaFields: Record<string, SchemaInputField> = {};

    for (const field of datasetFields) {
      const fieldName = new FieldName(field.name).value;
      const fieldType = this.mapDataTypeToField(field.dataType).getField();
      const fieldIsArray = new FieldIsArray(field.isArray).value;
      const fieldPosibleNull = new FieldPosibleNull(field.isPossibleNull).value;

      const fieldConfig = {
        type: fieldType,
        isArray: fieldIsArray,
        possibleNull: fieldPosibleNull,
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
    } else if (dataType.type === DATA_TYPES.SEQUENCE) {
      return new SequenceValueField({
        startsWith: dataType.startsWith,
        step: dataType.step,
      });
    } else if (dataType.type === DATA_TYPES.SEQUENTIAL) {
      return new SequentialValueField(dataType.values);
    } else if (dataType.type === DATA_TYPES.ENUM) {
      return new EnumValueField(dataType.values);
    } else {
      throw new IncorrectDefinedFieldDataTypeException(
        `The field must have a data type.`,
      );
    }
  }
}
