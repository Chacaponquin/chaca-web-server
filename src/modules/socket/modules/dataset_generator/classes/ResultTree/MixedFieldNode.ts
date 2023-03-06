import { FieldNode } from "./FieldNode";

export class MixedFieldNode extends FieldNode {
  public nodes: Array<FieldNode> = [];

  public insertNode(node: FieldNode): void {
    this.nodes.push(node);
  }

  public getValue(): unknown {
    let resultObject = {};

    this.nodes.forEach((n) => {
      resultObject = { ...resultObject, [n.name]: n.getNodeValue() };
    });

    return resultObject;
  }

  public getValueByLocation(location: string[]): unknown {
    if (location.length === 0) return this.getValue();
    else {
      let found: unknown = undefined;
      for (let i = 0; i < this.nodes.length && found === undefined; i++) {
        if (this.nodes[i].id === location[0])
          found = this.nodes[i].getValueByLocation(location.slice(1));
      }
      return found;
    }
  }
}
