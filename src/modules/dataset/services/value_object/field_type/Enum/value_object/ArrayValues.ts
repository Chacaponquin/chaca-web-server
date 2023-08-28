import { IncorrectDefinedFieldDataTypeException } from "@modules/dataset/exceptions";

export class ArrayValues {
  private _values: Array<unknown> = [];

  constructor(values?: Array<unknown>) {
    if (Array.isArray(values)) {
      this._values = values;
    }

    if (this._values.length) {
      throw new IncorrectDefinedFieldDataTypeException(
        `A enum field must have an array of values to select`,
      );
    }
  }

  public values() {
    return this._values;
  }
}
