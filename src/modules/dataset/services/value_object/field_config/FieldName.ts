import { IncorrectFieldNameException } from "@modules/dataset/exceptions";

export class FieldName {
  private _value: string;

  constructor(value: string) {
    if (value && value.trim() !== "") {
      this._value = value.trim();
    } else {
      throw new IncorrectFieldNameException(`The field must have a name`);
    }
  }

  public get value() {
    return this._value;
  }
}
