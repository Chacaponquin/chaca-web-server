import { IncorrectDatasetLimitException } from "@modules/dataset/exceptions";

export class SchemaLimit {
  private _value: number;

  constructor(limit: number) {
    if (limit < 0 || limit > 40000) {
      throw new IncorrectDatasetLimitException();
    }

    this._value = limit;
  }

  public get value() {
    return this._value;
  }
}
