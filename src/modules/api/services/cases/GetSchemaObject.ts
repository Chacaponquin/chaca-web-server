import {
  SchemaFieldType,
  SimpleSchemaConfig,
} from "@modules/api/dto/schema_config";
import { IncorrectFieldTypeException } from "@modules/api/exceptions";
import { FieldParams, FieldType } from "@modules/api/value-object";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE.enum";
import { FieldDataType } from "@modules/dataset/dto/data_type";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import {
  FieldIsArray,
  FieldName,
  FieldPosibleNull,
} from "@modules/dataset/services/value_object";

export class GetSchemaObject {
  constructor(private readonly datasetService: DatasetService) {}

  public execute(schemaConfig: SimpleSchemaConfig) {
    const schemaFields = this.mapToSchemaInputFields(schemaConfig);
    const schema = this.datasetService.buildSchema(schemaFields);

    return schema.generateObject();
  }

  private mapToSchemaInputFields(
    schemaConfig: SimpleSchemaConfig,
  ): Array<InputDatasetFieldDTO> {
    const schemaFields = [] as Array<InputDatasetFieldDTO>;

    for (const [fieldKey, fieldConfig] of Object.entries(schemaConfig)) {
      const fieldName = new FieldName(fieldKey).value;

      if (typeof fieldConfig === "string") {
        const fieldIsArray = new FieldIsArray().value;
        const fieldPosibleNull = new FieldPosibleNull().value;

        schemaFields.push({
          name: fieldName,
          isArray: fieldIsArray,
          isPosibleNull: fieldPosibleNull,
          dataType: this.mapTypeStringToDataType(fieldConfig),
        });
      } else if (typeof fieldConfig === "object") {
        const fieldIsArray = new FieldIsArray(fieldConfig.isArray).value;
        const fieldPosibleNull = new FieldPosibleNull(fieldConfig.isPosibleNull)
          .value;

        schemaFields.push({
          name: fieldName,
          isArray: fieldIsArray,
          isPosibleNull: fieldPosibleNull,
          dataType: this.mapSchemaConfigToDataType(fieldConfig.fieldType),
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
        const subSchemaFields = this.execute(
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
}
