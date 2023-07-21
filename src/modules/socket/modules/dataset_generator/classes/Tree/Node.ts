import { ConfigIsArray } from "../../../../../dataset/dto/field";

export interface NodeConfig {
  id: string;
  name: string;
  isArray: ConfigIsArray;
  isPosibleNull: number;
}

export abstract class Node {
  constructor(protected readonly config: NodeConfig) {}

  get name() {
    return this.config.name;
  }

  public abstract getNoArrayNode(): Node;

  public abstract getModelObject(): unknown;

  protected getCommonModelProperties() {
    return { isArray: this.isArray, isPossibleNull: this.isPosibleNull };
  }

  get id() {
    return this.config.id;
  }

  get isArray() {
    return this.config.isArray;
  }

  get isPosibleNull() {
    return this.config.isPosibleNull;
  }

  get fieldConfig() {
    return { id: this.id, isPosibleNull: this.isPosibleNull, name: this.name };
  }
}
