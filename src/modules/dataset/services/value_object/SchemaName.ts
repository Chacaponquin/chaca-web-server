export class SchemaName {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  public get value() {
    return this._value;
  }
}
