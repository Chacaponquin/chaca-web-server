export class ParamsObject {
  private _params: Record<string, unknown> = {};

  constructor(params: Record<string, unknown>) {
    for (const [key, value] of Object.entries(params)) {
      const param = new Param(value);
      this._params = { ...this._params, [key]: param.value };
    }
  }

  public get value() {
    return this._params;
  }
}

export class Param {
  private _value: any = undefined;

  constructor(value: unknown) {
    this._value = this.validate(value);
  }

  public get value() {
    return this._value;
  }

  private validate(value: unknown) {
    const isNum = Number(value);

    if (!Number.isNaN(isNum)) {
      return isNum;
    }

    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }

    if (value === "null") {
      return null;
    }

    if (value === "undefined") {
      return undefined;
    }

    return String(value);
  }
}
