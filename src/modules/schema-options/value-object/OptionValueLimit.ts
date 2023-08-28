import { FieldIsArray } from "@modules/dataset/services/value_object/field_config";
import { InvalidOptionValueLimitException } from "../exceptions";
import { ConfigIsArray } from "@modules/dataset/dto/field";
import { Param } from "@modules/api/services/value-object";

export class OptionValueLimit {
  private _limit: number | null = null;

  constructor(limit: unknown) {
    try {
      const lim = new Param(limit).value;
      this._limit = new FieldIsArray(lim as ConfigIsArray).getLimitValue();
    } catch (error) {
      throw new InvalidOptionValueLimitException(error.message);
    }
  }

  public get value() {
    return this._limit;
  }
}
