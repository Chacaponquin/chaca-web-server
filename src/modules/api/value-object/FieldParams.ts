import { IncorrectFieldTypeException } from "../exceptions";

export class FieldParams {
  private _params: Record<string, unknown> = {};

  constructor(params: string) {
    const isValid = this.validate(params);

    if (!isValid) {
      throw new IncorrectFieldTypeException(
        `The field params must have a pattern like: <key=value;...>. Example: <length=5>`,
      );
    }

    this._params = this.createParams(params);
  }

  private getValueFromString(value: string): unknown {
    try {
      const returnValue = JSON.parse(value);
      return returnValue;
    } catch (error) {
      return undefined;
    }
  }

  private createParams(str: string): Record<string, unknown> {
    let returnParams: Record<string, unknown> = {};

    const content = str.substring(1, str.length - 1);
    const pairs = content.split(";");

    for (const pair of pairs) {
      const keyValue = pair.split("=");

      const [key, value] = keyValue;

      returnParams = { ...returnParams, [key]: this.getValueFromString(value) };
    }

    return returnParams;
  }

  private validate(str: string): boolean {
    if (!(str.startsWith("<") && str.endsWith(">"))) {
      return false;
    }

    const content = str.substring(1, str.length - 1);
    const pairs = content.split(";");

    for (const pair of pairs) {
      const keyValue = pair.split("=");

      if (keyValue.length !== 2) {
        return false;
      }
    }

    return true;
  }

  public get value() {
    return this._params;
  }
}
