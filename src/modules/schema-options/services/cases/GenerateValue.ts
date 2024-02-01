import { ParamsObject } from "@modules/api/services/value-object";
import { SchemaOption } from "@modules/schema-options/domain";
import { OptionValueLimit } from "@modules/schema-options/value-object";

interface Props {
  option: SchemaOption;
  config: Record<string, unknown>;
}

export class GenerateValue {
  execute({ config, option }: Props): Array<unknown> | unknown {
    const { isArray, ...a } = config;
    const limit = new OptionValueLimit(isArray).value;
    const args = new ParamsObject(a).value;

    if (limit !== null) {
      const allValues = [] as Array<unknown>;

      for (let i = 0; i < limit; i++) {
        allValues.push(option.schemaField().getValue(args));
      }

      return allValues;
    } else {
      const value = option.schemaField().getValue(args);
      return value;
    }
  }
}
