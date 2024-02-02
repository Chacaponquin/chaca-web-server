export class StartsWith {
  private _value = 1;

  constructor(value?: number) {
    if (typeof value === "number") {
      this._value = value;
    }
  }

  public value() {
    return this._value;
  }
}
