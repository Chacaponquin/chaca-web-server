import { Node } from "../Tree";
import { FieldNode, FieldNodeProps } from "./FieldNode";

export class ArrayResultNode extends FieldNode {
  private arrayNodes: Array<FieldNode> = [];

  constructor(config: FieldNodeProps, public readonly fieldInfo: Node) {
    super(config);
  }

  public getValue(): unknown[] {
    return this.arrayNodes.map((n) => n.getValue());
  }

  public insertNode(n: FieldNode) {
    this.arrayNodes.push(n);
  }

  public getValueByLocation(location: string[]): unknown | unknown[] {
    if (location.length === 0) return this.getValue();
    else {
      let found: unknown = undefined;
      for (let i = 0; i < this.arrayNodes.length && found === undefined; i++) {
        if (this.arrayNodes[i].id === location[0])
          found = this.arrayNodes[i].getValueByLocation(location.slice(1));
      }
      return found;
    }
  }
}
