import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { chaca, FieldSchemaConfig } from "chaca";
import {
  FieldIsArray,
  FieldName,
  FieldPossibleNull,
} from "../value_object/field-config";
import {
  CustomValueField,
  DefinedValueField,
  EnumValueField,
  KeyValueField,
  MixedValueField,
  RefValueField,
  SequenceValueField,
  SequentialValueField,
} from "../value_object/field-type";
import { IncorrectDefinedFieldDatatypeException } from "@modules/dataset/exceptions/field";
import { Schema } from "../value_object/schemas";

export class ChacaSchemaBuilder {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(datasetFields: Array<InputDatasetFieldDTO>): Schema {
    const schemaFields: Record<string, FieldSchemaConfig> = {};

    for (const field of datasetFields) {
      const fieldName = new FieldName(field.name);
      const fieldType = this._mapDatatypeToField(field.dataType, field.isKey);
      const fieldIsArray = new FieldIsArray(field.isArray);
      const fieldPossibleNull = new FieldPossibleNull(field.isPossibleNull);

      const fieldConfig: FieldSchemaConfig = {
        type: fieldType.getField(),
        isArray: fieldIsArray.value,
        possibleNull: fieldPossibleNull.value,
      };

      schemaFields[fieldName.value] = fieldConfig;
    }

    const schema = chaca.schema(schemaFields);
    return new Schema(schema);
  }

  private _mapDatatypeToField(
    dataType: FieldDataType,
    isKey?: boolean,
  ): ISchemaField {
    // defined value
    if (dataType.type === DATA_TYPES.SINGLE_VALUE) {
      const field = new DefinedValueField(
        this.schemaOptionsServices,
        dataType.fieldType,
      );

      return isKey ? new KeyValueField(field) : field;
    }

    // ref
    else if (dataType.type === DATA_TYPES.REF) {
      const field = new RefValueField(dataType.ref);

      return isKey ? new KeyValueField(field) : field;
    }

    // custom
    else if (dataType.type === DATA_TYPES.CUSTOM) {
      const field = new CustomValueField(dataType.code);

      return isKey ? new KeyValueField(field) : field;
    }

    // mixed
    else if (dataType.type === DATA_TYPES.MIXED) {
      const schema = this.execute(dataType.object);
      return new MixedValueField(schema);
    }

    // sequence
    else if (dataType.type === DATA_TYPES.SEQUENCE) {
      const field = new SequenceValueField({
        startsWith: dataType.startsWith,
        step: dataType.step,
      });

      return isKey ? new KeyValueField(field) : field;
    }

    // sequential
    else if (dataType.type === DATA_TYPES.SEQUENTIAL) {
      const field = new SequentialValueField({
        values: dataType.values,
        loop: dataType.loop,
      });

      return field;
    }

    // enum
    else if (dataType.type === DATA_TYPES.ENUM) {
      return new EnumValueField(dataType.values);
    } else {
      throw new IncorrectDefinedFieldDatatypeException(
        `The field must have a data type.`,
      );
    }
  }
}
