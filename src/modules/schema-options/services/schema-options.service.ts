import { Injectable } from "@nestjs/common";
import { SchemaOptionsRepository } from "./schema-options-repository.service";
import { Schema, SchemaOption } from "../domain";
import { GenerateValue } from "./cases";

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
    const serviceCase = new GenerateValue();
    return serviceCase.execute({ config: config, option: option });
  }
}
