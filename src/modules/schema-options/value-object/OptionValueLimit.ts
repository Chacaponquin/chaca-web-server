import { FieldIsArray } from "@modules/dataset/services/value_object";
import { InvalidOptionValueLimitException } from "../exceptions";
import { ConfigIsArray } from "@modules/dataset/dto/field";

export class OptionValueLimit {
  private _limit: number | null;

  constructor(limit: unknown) {
    try {
      let l = limit;
      if (typeof limit === "string") {
        l = Number(limit);
      }

      this._limit = new FieldIsArray(l as ConfigIsArray).getLimitValue();
    } catch (error) {
      throw new InvalidOptionValueLimitException(error.message);
    }
  }

  public get value() {
    return this._limit;
  }
}
