import { ConfigIsArray } from "@modules/dataset/dto/field";
import { IncorrectFieldArrayConfigException } from "@modules/dataset/exceptions";

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

  public get value() {
    return this._value;
  }
}
