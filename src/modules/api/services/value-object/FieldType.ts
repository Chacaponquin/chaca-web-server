import {
  IncorrectFieldParamsException,
  IncorrectFieldTypeException,
} from "../../exceptions";

export class FieldType {
  private _type: string;
  private _params: Record<string, unknown> = {};

  constructor(type?: string, params?: Record<string, unknown>) {
    this.validateType(type);

    if (type === "schema") {
      this.validateParams(params);
      this._params = params as Record<string, unknown>;
    }
  }

  private validateType(type?: string): void {
    if (!(typeof type === "string")) {
      throw new IncorrectFieldTypeException();
    } else {
      this._type = type;
    }
  }

  private validateParams(params?: Record<string, unknown>): void {
    if (typeof params !== "object" || params === null) {
      throw new IncorrectFieldParamsException();
    }
  }

  public get type() {
    return this._type;
  }

  public get params() {
    return this._params;
  }
}
