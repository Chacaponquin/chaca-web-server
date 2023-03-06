import { SubOption } from "@modules/schema-options/interfaces/options.interface";
import { Node } from ".";
import { NodeConfig } from "./Node";
import { chaca } from "chaca";

export class SchemaValueNode extends Node {
  constructor(
    config: NodeConfig,
    private readonly schemaInfo: { parent: string; option: string },
    private readonly args: { [key: string]: unknown },
    private readonly schema: SubOption,
  ) {
    super(config);
  }

  public getNoArrayNode(): Node {
    return new SchemaValueNode(
      { ...this.config, isArray: null },
      this.schemaInfo,
      this.args,
      this.schema,
    );
  }

  public getModelObject(): unknown {
    return {
      ...this.getCommonModelProperties(),
      dataType: `${chaca.utils.camelCaseText(
        this.schemaInfo.parent,
      )}/${chaca.utils.camelCaseText(this.schemaInfo.option)}`,
    };
  }

  public getValue() {
    return this.schema.getValue(this.args);
  }

  public resolve(): unknown {
    return this.schema.getValue(this.args);
  }
}
