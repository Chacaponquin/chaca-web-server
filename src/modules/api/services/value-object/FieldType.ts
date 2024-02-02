import { SchemaFieldParams } from "@modules/api/dto/schema_config";
import { IncorrectFieldTypeException } from "../../exceptions";

export class FieldType {
  private _type: string;
  private _params: SchemaFieldParams = {};

  constructor(type?: string, params?: SchemaFieldParams) {
    this.validateType(type);

    if (params) {
      this._params = params;
    }
  }

  private validateType(type?: string): void {
    if (!(typeof type === "string")) {
      throw new IncorrectFieldTypeException(
        "The field type must be a string. Example: id.uuid",
      );
    } else {
      this._type = type;
    }
  }

  public get type() {
    return this._type;
  }

  public get params() {
    return this._params;
  }
}
