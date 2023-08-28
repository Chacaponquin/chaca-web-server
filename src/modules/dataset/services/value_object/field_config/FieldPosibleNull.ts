export class FieldPosibleNull {
  private _value = 0;

  constructor(value?: number) {
    if (value) {
      if (value >= 0 && value <= 100) {
        this._value = value;
      }
    }
  }

  public get value() {
    return this._value;
  }
}
