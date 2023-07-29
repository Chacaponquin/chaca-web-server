import { ConfigIsArray, ConfigIsArrayObject } from "@modules/dataset/dto/field";
import { IncorrectFieldArrayConfigException } from "@modules/dataset/exceptions";
import { schemas } from "chaca";

export class FieldIsArray {
  private _value: ConfigIsArray = null;

  constructor(isArray?: ConfigIsArray) {
    if (typeof isArray === "number") {
      this.validateSpecificLimit(isArray);
      this._value = isArray;
    } else {
      if (isArray) {
        if (isArray.max && !isArray.min) {
          this.validateMax(isArray.max);
          this._value = { max: isArray.max };
        } else if (!isArray.max && isArray.min) {
          this.validateMin(isArray.min);
          this._value = { min: isArray.min };
        } else if (isArray.max && isArray.min) {
          this.validateMax(isArray.max);
          this.validateMin(isArray.min);

          if (isArray.max >= isArray.min) {
            this._value = isArray;
          } else {
            throw new IncorrectFieldArrayConfigException(
              `The 'min' limit can not be greater than 'max' limit`,
            );
          }
        } else {
          this._value = { max: 10, min: 0 };
        }
      }
    }
  }

  private validateSpecificLimit(limit: number): void {
    if (limit < 0) {
      throw new IncorrectFieldArrayConfigException(
        `The 'isArray' limit can not be less than 0`,
      );
    }
  }

  private validateMax(max?: number): void {
    if (max) {
      if (max < 0) {
        throw new IncorrectFieldArrayConfigException(
          `The 'max' limit can not be less than 0`,
        );
      }
    }
  }

  private validateMin(min?: number): void {
    if (min) {
      if (min < 0) {
        throw new IncorrectFieldArrayConfigException(
          `The 'min' limit can not be less than 0`,
        );
      }
    }
  }

  public getLimitValue() {
    const value = this.value;

    if (value === null) {
      return null;
    } else if (typeof value === "number") {
      return value;
    } else {
      const config = value as ConfigIsArrayObject;
      const limit = schemas.dataType
        .int()
        .getValue({ min: config.min, max: config.max });
      return limit;
    }
  }

  public get value() {
    return this._value;
  }
}
