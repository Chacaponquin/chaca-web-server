import { Injectable } from "@nestjs/common";
import { SCHEMAS } from "../constants";
import { NotFoundOptionError, NotFoundSchemaError } from "../exceptions";
import { Schema, SchemaOption } from "../domain";

@Injectable()
export class SchemaOptionsRepository {
  private SCHEMAS: Array<Schema> = SCHEMAS;

  public allSchemas(): Array<Schema> {
    return this.SCHEMAS;
  }

  public findSchema(schema: string): Schema | null {
    const allSchemas = this.allSchemas();
    const foundSchema = allSchemas.find((s) => s.equal(schema) === true);

    return foundSchema ? foundSchema : null;
  }

  public findSchemaOption(schema: string, option: string): SchemaOption {
    const foundSchema = this.findSchema(schema);

    if (foundSchema) {
      const findOption = foundSchema.options.find((o) => o.equal(option));

      if (findOption) {
        return findOption;
      } else {
        throw new NotFoundOptionError(schema, option);
      }
    } else {
      throw new NotFoundSchemaError(schema);
    }
  }
}
