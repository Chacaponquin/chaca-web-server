import { IncorrectDatasetNameException } from "@modules/dataset/exceptions";

export class SchemaName {
  private _value: string;

  constructor(value: string) {
    if (value.trim() === "") {
      throw new IncorrectDatasetNameException(`The dataset must have a name`);
    }

    this._value = value.trim();
  }

  public get value() {
    return this._value;
  }
}
