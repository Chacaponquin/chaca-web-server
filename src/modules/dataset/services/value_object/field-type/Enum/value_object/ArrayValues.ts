import { IncorrectDefinedFieldDatatypeException } from "@modules/dataset/exceptions/field";

export class ArrayValues {
  private _values: Array<unknown> = [];

  constructor(values?: Array<unknown>) {
    if (Array.isArray(values)) {
      this._values = values;
    }

    if (this._values.length === 0) {
      throw new IncorrectDefinedFieldDatatypeException(
        `A enum field must have an array of values to select`,
      );
    }
  }

  public values() {
    return this._values;
  }
}
