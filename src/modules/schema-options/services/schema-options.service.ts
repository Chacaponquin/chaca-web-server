import { Injectable } from "@nestjs/common";
import { SchemaOptionsRepository } from "./schema-options-repository.service";
import { OptionValueLimit } from "../value-object";
import { ParamsObject } from "@modules/api/services/value-object";
import { Schema, SchemaOption } from "../domain";

@Injectable()
export class SchemaOptionsService {
  constructor(private readonly repository: SchemaOptionsRepository) {}

  public allSchemas(): Array<Schema> {
    return this.repository.allSchemas();
  }

  public findSchemaOption(schema: string, option: string): SchemaOption {
    return this.repository.findSchemaOption(schema, option);
  }

  public findSchema(schema: string): Schema | null {
    return this.repository.findSchema(schema);
  }

  public generateValueByParams(
    option: SchemaOption,
    config: Record<string, unknown>,
  ): unknown | Array<unknown> {
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
