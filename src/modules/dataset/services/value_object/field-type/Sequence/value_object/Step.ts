import { IncorrectDefinedFieldDatatypeException } from "@modules/dataset/exceptions/field";

export class Step {
  private _value = 1;

  constructor(v?: number) {
    if (typeof v === "number") {
      if (v > 0) {
        this._value = v;
      } else {
        throw new IncorrectDefinedFieldDatatypeException(
          `The sequence value must have a step greater than 0`,
        );
      }
    }
  }

  public value() {
    return this._value;
  }
}
