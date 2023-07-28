export class ParamsObject {
  private _params: Record<string, unknown> = {};

  constructor(params: Record<string, unknown>) {
    for (const [key, value] of Object.entries(params)) {
      this._params = { ...this._params, [key]: this.valueFromString(value) };
    }
  }

  private valueFromString(value: unknown): unknown {
    try {
      const returnValue = JSON.parse(value as string);
      return returnValue;
    } catch (error) {
      return undefined;
    }
  }

  public get value() {
    return this._params;
  }
}
