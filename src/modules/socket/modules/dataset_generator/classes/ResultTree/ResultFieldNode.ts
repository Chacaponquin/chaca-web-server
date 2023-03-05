import { FieldNode, FieldNodeProps } from "./FieldNode";

export class ResultFieldNode extends FieldNode {
  private value: unknown | unknown[];

  constructor(config: FieldNodeProps, value: unknown) {
    super(config);
    this.value = value;
  }

  public getValueByLocation(location: string[]): unknown {
    if (location.length === 0) return this.getValue();
    else return undefined;
  }

  public getValue(): unknown {
    return this.value;
  }
}
