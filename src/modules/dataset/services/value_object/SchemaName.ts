import { IncorrectDatasetNameException } from "@modules/dataset/exceptions";

export class SchemaName {
  private _value: string;

  constructor(value: string) {
    if (value.trim() === "") {
      throw new IncorrectDatasetNameException();
    }

    this._value = value;
  }

  public get value() {
    return this._value;
  }
}
