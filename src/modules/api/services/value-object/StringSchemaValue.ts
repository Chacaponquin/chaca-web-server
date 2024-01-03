import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { SchemaOption } from "./SchemaOption";
import { FieldParams } from "./FieldParams";
import { FieldType } from "./FieldType";
import { FieldDataType } from "@modules/dataset/dto/data_type";

export class StringSchemaValue {
  private _type: FieldType;

  constructor(type: FieldType) {
    this._type = type;
  }

  public value(): FieldDataType {
    const indexFirstArgument = this._type.type.indexOf("<");

    if (indexFirstArgument !== -1) {
      const argsString = this._type.type.slice(indexFirstArgument).trim();
      const schemaString = this._type.type.slice(0, indexFirstArgument);

      const args = new FieldParams(argsString);
      const option = new SchemaOption(schemaString);

      return {
        type: DATA_TYPES.SINGLE_VALUE,
        fieldType: {
          args: { ...this._type.params, ...args.value },
          schema: option.schema,
          option: option.option,
        },
      };
    } else {
      const option = new SchemaOption(this._type.type);

      return {
        type: DATA_TYPES.SINGLE_VALUE,
        fieldType: {
          args: this._type.params,
          schema: option.schema,
          option: option.option,
        },
      };
    }
  }
}
