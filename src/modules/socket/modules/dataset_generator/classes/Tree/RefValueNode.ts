import { ChacaDatasetError } from "../../../../errors/ChacaDatasetError";
import { Node, NodeConfig } from "./Node";

export class RefValueNode extends Node {
  constructor(config: NodeConfig, public readonly ref: string[]) {
    super(config);
    if (ref.length === 0)
      throw new ChacaDatasetError(
        `The field ${this.name} no reference a field`,
      );
  }

  public getModelObject(): unknown {
    return { ...this.getCommonModelProperties(), dataType: this.ref };
  }

  public getNoArrayNode(): Node {
    return new RefValueNode({ ...this.config, isArray: null }, this.ref);
  }
}
