import { ApiSchema } from "@modules/schema-options/interfaces/options.interface";
import { InputDatasetField } from "../../dto/datasetsDTO.dto";
import { TreeUtils } from "../../utils/TreeUtils";
import { Node } from "./";

export class RootNode {
  public n: Array<Node> = [];

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly limit: number,
  ) {}

  public get nodes() {
    return this.n;
  }

  public insertNode(node: Node): void {
    this.nodes.push(node);
    this.n = TreeUtils.orderFieldsByPriority(this.n);
  }

  public insertDatasetsFields(
    fields: InputDatasetField[],
    schemas: Array<ApiSchema>,
  ) {
    for (const f of fields) {
      const newNode = TreeUtils.createNodeByDatatype(f, schemas);
      this.insertNode(newNode);
    }
  }
}
