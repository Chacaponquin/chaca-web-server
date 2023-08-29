import {
  SchemaFieldParams,
  SimpleSchemaConfig,
} from "@modules/api/dto/schema_config";
import { InvalidSchemaException } from "@modules/api/exceptions";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { FieldParams } from "./FieldParams";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import {
  FieldIsArray,
  FieldName,
  FieldPosibleNull,
} from "@modules/dataset/services/value_object/field_config";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { FieldType } from "./FieldType";
import { SchemaOption } from "./SchemaOption";

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

  private mapToSchemaInputFields(
    schemaInput?: SimpleSchemaConfig,
  ): Array<InputDatasetFieldDTO> {
    const schema = this.validate(schemaInput);
    const schemaFields = [] as Array<InputDatasetFieldDTO>;

    for (const [fieldKey, fieldConfig] of Object.entries(schema)) {
      const fieldName = new FieldName(fieldKey).value;

      if (typeof fieldConfig === "string") {
        const fieldIsArray = new FieldIsArray();
        const fieldPossibleNull = new FieldPosibleNull();
        const fieldType = new FieldType(fieldConfig);

        const fieldDataType = this.mapTypeStringToDataType(fieldType);

        schemaFields.push({
          name: fieldName,
          isArray: fieldIsArray.value,
          isPossibleNull: fieldPossibleNull.value,
          dataType: fieldDataType,
        });
      } else if (typeof fieldConfig === "object") {
        const fieldIsArray = new FieldIsArray(fieldConfig.isArray);
        const fieldPosibleNull = new FieldPosibleNull(fieldConfig.posibleNull);
        const fieldDataType = this.mapSchemaConfigToDataType(
          fieldConfig.fieldType,
          fieldConfig.params,
        );

        schemaFields.push({
          name: fieldName,
          isArray: fieldIsArray.value,
          isPossibleNull: fieldPosibleNull.value,
          dataType: fieldDataType,
        });
      }
    }

    return schemaFields;
  }

  private mapSchemaConfigToDataType(
    type?: string,
    params?: SchemaFieldParams,
  ): FieldDataType {
    const fieldType = new FieldType(type, params);

    if (fieldType.type === "schema") {
      const subSchemaFields = this.mapToSchemaInputFields(
        fieldType.params as SimpleSchemaConfig,
      );

      return { type: DATA_TYPES.MIXED, object: subSchemaFields };
    } else {
      const dataType = this.mapTypeStringToDataType(fieldType);
      return dataType;
    }
  }

  private mapTypeStringToDataType(type: FieldType): FieldDataType {
    const indexFirstArgument = type.type.indexOf("<");

    if (indexFirstArgument !== -1) {
      const argsString = type.type.slice(indexFirstArgument).trim();
      const schemaString = type.type.slice(0, indexFirstArgument);

      const args = new FieldParams(argsString).value;
      const option = new SchemaOption(schemaString);

      return {
        type: DATA_TYPES.SINGLE_VALUE,
        fieldType: {
          args: { ...type.params, ...args },
          parent: option.schema,
          type: option.option,
        },
      };
    } else {
      const option = new SchemaOption(type.type);

      return {
        type: DATA_TYPES.SINGLE_VALUE,
        fieldType: {
          args: type.params,
          parent: option.schema,
          type: option.option,
        },
      };
    }
  }

  public getFields() {
    return this.mapToSchemaInputFields(this._value);
  }
}
