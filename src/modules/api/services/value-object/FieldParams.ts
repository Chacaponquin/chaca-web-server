import { IncorrectFieldTypeException } from "../../exceptions";
import { ParamsObject } from "./ParamsObject";

export class FieldParams {
  private _params: Record<string, unknown> = {};

  constructor(params: string) {
    this.validate(params);
    this._params = this.createParams(params);
  }

  private createParams(str: string): Record<string, unknown> {
    const content = str.substring(1, str.length - 1);
    const pairs = content.split(";");

    let objectParams: Record<string, string> = {};
    for (const pair of pairs) {
      const keyValue = pair.split("=");
      const [key, value] = keyValue;

      objectParams = { ...objectParams, [key]: value };
    }

    return new ParamsObject(objectParams).value;
  }

  private validate(str: string): void {
    let isValid = true;

    if (!(str.startsWith("<") && str.endsWith(">"))) {
      isValid = false;
    }

    const content = str.substring(1, str.length - 1);

    if (content.trim() !== "") {
      const pairs = content.split(";");

      for (let i = 0; i < pairs.length && isValid; i++) {
        const pair = pairs[i];
        const keyValue = pair.split("=");

        if (keyValue.length !== 2) {
          isValid = false;
        }
      }
    }

    if (!isValid) {
      throw new IncorrectFieldTypeException(
        `The field params must have a pattern like: <key=value;...>. Example: <length=5>`,
      );
    }
  }

  public get value() {
    return this._params;
  }
}
