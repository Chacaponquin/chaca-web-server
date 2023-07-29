import { IncorrectFieldNameException } from "@modules/dataset/exceptions";

export class FieldName {
  private _value: string;

  constructor(value: string) {
    if (value && value.trim() !== "") {
      this._value = value;
    } else {
      throw new IncorrectFieldNameException();
    }
  }

  public get value() {
    return this._value;
  }
}
