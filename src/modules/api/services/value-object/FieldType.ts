import {
  IncorrectFieldParamsException,
  IncorrectFieldTypeException,
} from "../../exceptions";

export class FieldType {
  private _type: string;
  private _params: Record<string, unknown> = {};

  constructor(type?: string, params?: Record<string, unknown>) {
    this.validateType(type);
    this.validateParams(params);
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

  private validateParams(params?: Record<string, unknown>): void {
    if (params !== undefined) {
      if (typeof params !== "object" || params === null) {
        throw new IncorrectFieldParamsException(
          `The field type params must be an object with the values`,
        );
      } else {
        this._params = params;
      }
    }
  }

  public get type() {
    return this._type;
  }

  public get params() {
    return this._params;
  }
}
