import {
  SchemaFieldType,
  SimpleSchemaConfig,
} from "@modules/api/dto/schema_config";
import {
  IncorrectFieldTypeException,
  InvalidSchemaException,
} from "@modules/api/exceptions";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE.enum";
import { FieldParams } from "./FieldParams";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import {
  FieldIsArray,
  FieldName,
  FieldPosibleNull,
} from "@modules/dataset/services/value_object";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { FieldType } from "./FieldType";

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
        const fieldPosibleNull = new FieldPosibleNull();
        const fieldDataType = this.mapTypeStringToDataType(fieldConfig);

        schemaFields.push({
          name: fieldName,
          isArray: fieldIsArray.value,
          isPosibleNull: fieldPosibleNull.value,
          dataType: fieldDataType,
        });
      } else if (typeof fieldConfig === "object") {
        const fieldIsArray = new FieldIsArray(fieldConfig.isArray);
        const fieldPosibleNull = new FieldPosibleNull(
          fieldConfig.isPosibleNull,
        );
        const fieldDataType = this.mapSchemaConfigToDataType(
          fieldConfig.fieldType,
        );

        schemaFields.push({
          name: fieldName,
          isArray: fieldIsArray.value,
          isPosibleNull: fieldPosibleNull.value,
          dataType: fieldDataType,
        });
      }
    }

    return schemaFields;
  }

  private mapTypeStringToDataType(type: string): FieldDataType {
    const indexFirstArgument = type.indexOf("<");

    if (indexFirstArgument !== -1) {
      const argsString = type.slice(indexFirstArgument).trim();
      const schemaString = type.slice(0, indexFirstArgument);

      const args = new FieldParams(argsString).value;
      const [schema, option] = this.parseSchemaOptionString(schemaString);

      return {
        type: DATA_TYPES.SINGLE_VALUE,
        fieldType: { args: args, parent: schema, type: option },
      };
    } else {
      const [schema, option] = this.parseSchemaOptionString(type);
      return {
        type: DATA_TYPES.SINGLE_VALUE,
        fieldType: { args: {}, parent: schema, type: option },
      };
    }
  }

  private mapSchemaConfigToDataType(type?: SchemaFieldType): FieldDataType {
    if (typeof type === "string") {
      const dataType = this.mapTypeStringToDataType(type);
      return dataType;
    } else if (typeof type === "object") {
      const fieldType = new FieldType(type.type, type.params);

      if (fieldType.type === "schema") {
        const subSchemaFields = this.mapToSchemaInputFields(
          fieldType.params as SimpleSchemaConfig,
        );
        return { type: DATA_TYPES.MIXED, object: subSchemaFields };
      } else {
        const [schema, option] = this.parseSchemaOptionString(fieldType.type);
        return {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { args: fieldType.params, parent: schema, type: option },
        };
      }
    } else {
      throw new IncorrectFieldTypeException(
        `You must specify a type for this field`,
      );
    }
  }

  private parseSchemaOptionString(optionString: string): [string, string] {
    const pattern = /^[\w]+[.][\w]+$/;

    if (pattern.test(optionString)) {
      const [schema, option] = optionString.split(".");
      return [schema, option];
    } else {
      throw new IncorrectFieldTypeException(
        `The field type must have the pattern 'schema.option'. Example: 'id.uuid'`,
      );
    }
  }

  public getFields() {
    return this.mapToSchemaInputFields(this._value);
  }
}
