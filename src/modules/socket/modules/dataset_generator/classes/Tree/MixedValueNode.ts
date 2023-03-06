import { ApiSchema } from "@modules/schema-options/interfaces/options.interface";
import { InputDatasetField } from "../../../../dto/datasetsDTO.dto";
import { TreeUtils } from "../../utils/TreeUtils";
import { Node, NodeConfig } from "./Node";

export class MixedValueNode extends Node {
  private n: Array<Node> = [];

  constructor(config: NodeConfig) {
    super(config);
  }

  public get nodes() {
    return this.n;
  }

  public getModelObject(): unknown {
    let typeObject = {};

    for (const n of this.nodes) {
      typeObject = { ...typeObject, [n.name]: n.getModelObject() };
    }

    return {
      dataType: typeObject,
      ...this.getCommonModelProperties(),
    };
  }

  public insertNode(node: Node) {
    this.n.push(node);
    this.n = TreeUtils.orderFieldsByPriority(this.n);
  }

  public getNoArrayNode(): Node {
    return new MixedValueNode({ ...this.config, isArray: null });
  }

  public insertSubFields(
    fields: InputDatasetField[],
    schemas: Array<ApiSchema>,
  ) {
    for (const f of fields) {
      const newNode = TreeUtils.createNodeByDatatype(f, schemas);
      this.insertNode(newNode);
    }
  }
}
