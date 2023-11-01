import {
  SchemaFieldParams,
  SimpleSchemaConfig,
} from "@modules/api/dto/schema_config";
import { InvalidSchemaException } from "@modules/api/exceptions";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import {
  FieldIsArray,
  FieldName,
  FieldPossibleNull,
} from "@modules/dataset/services/value_object/field_config";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { FieldType } from "./FieldType";
import {
  EnumValueField,
  SequenceValueField,
  SequentialValueField,
} from "@modules/dataset/services/value_object/field_type";
import { StringSchemaValue } from "./StringSchemaValue";

export class SchemaInput {
  private _value?: SimpleSchemaConfig;

  constructor(schemaConfigInput?: SimpleSchemaConfig) {
    this._value = schemaConfigInput;
  }

  private validate(schemaConfigInput?: SimpleSchemaConfig): SimpleSchemaConfig {
    if (schemaConfigInput === undefined) {
      return {};
    } else if (
      typeof schemaConfigInput === "object" &&
      schemaConfigInput !== null
    ) {
      return schemaConfigInput;
    } else {
      throw new InvalidSchemaException(
        "The schema configuration must be an object with the fields.",
      );
    }
  }

  private _mapToSchemaInputFields(
    schemaInput?: SimpleSchemaConfig,
  ): Array<InputDatasetFieldDTO> {
    const schema = this.validate(schemaInput);
    const schemaFields = [] as Array<InputDatasetFieldDTO>;

    for (const [fieldKey, fieldConfig] of Object.entries(schema)) {
      const fieldName = new FieldName(fieldKey);

      if (typeof fieldConfig === "string") {
        const fieldIsArray = new FieldIsArray();
        const fieldPossibleNull = new FieldPossibleNull();
        const fieldType = new FieldType(fieldConfig);

        const fieldDataType = new StringSchemaValue(fieldType);

        schemaFields.push({
          name: fieldName.value,
          isArray: fieldIsArray.value,
          isPossibleNull: fieldPossibleNull.value,
          dataType: fieldDataType.value(),
        });
      } else if (typeof fieldConfig === "object") {
        const fieldIsArray = new FieldIsArray(fieldConfig.isArray);
        const fieldPosibleNull = new FieldPossibleNull(fieldConfig.posibleNull);
        const fieldDatatype = this._mapSchemaConfigToDataType(
          fieldConfig.fieldType,
          fieldConfig.params,
        );

        schemaFields.push({
          name: fieldName.value,
          isArray: fieldIsArray.value,
          isPossibleNull: fieldPosibleNull.value,
          dataType: fieldDatatype,
        });
      }
    }

    return schemaFields;
  }

  private _mapSchemaConfigToDataType(
    type?: string,
    params?: SchemaFieldParams,
  ): FieldDataType {
    const fieldType = new FieldType(type, params);

    // mixed
    if (fieldType.type === "schema") {
      const subSchemaFields = this._mapToSchemaInputFields(
        fieldType.params as SimpleSchemaConfig,
      );

      return { type: DATA_TYPES.MIXED, object: subSchemaFields };
    }

    // sequence
    else if (fieldType.type === "sequence") {
      const config = new SequenceValueField(fieldType.params);

      return {
        type: DATA_TYPES.SEQUENCE,
        startsWith: config.startsWith,
        step: config.step,
      };
    }

    // sequential
    else if (fieldType.type === "sequential") {
      const config = new SequentialValueField(fieldType.params);

      return { type: DATA_TYPES.SEQUENTIAL, values: config.values };
    }

    // enum
    else if (fieldType.type === "enum") {
      const config = new EnumValueField(fieldType.params);

      return { type: DATA_TYPES.ENUM, values: config.values };
    }

    // schema value
    else {
      const dataType = new StringSchemaValue(fieldType);
      return dataType.value();
    }
  }

  public fields() {
    return this._mapToSchemaInputFields(this._value);
  }
}
