import { IncorrectDatasetLimitException } from "@modules/dataset/exceptions";
import { schemas } from "chaca";

export class SchemaLimit {
  private _value: number;

  constructor(limit?: number) {
    if (typeof limit === "number") {
      if (limit < 0) {
        throw new IncorrectDatasetLimitException(
          `The documents count must be greater than 0`,
        );
      }

      if (limit > 40000) {
        throw new IncorrectDatasetLimitException(
          `The documents count can not be greater than 40000`,
        );
      }

      this._value = limit;
    } else {
      this._value = schemas.dataType.int().getValue({ min: 1, max: 10 });
    }
  }

  public get value() {
    return this._value;
  }
}
