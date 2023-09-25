import { Injectable } from "@nestjs/common";
import { SCHEMAS } from "../constants";
import { chaca } from "chaca";
import { NotFoundOptionError, NotFoundSchemaError } from "../exceptions";
import { Schema, SchemaOption } from "../domain";

@Injectable()
export class SchemaOptionsRepository {
  private SCHEMAS: Array<Schema> = SCHEMAS;

  private _stringToCompareName(name: string): string {
    return chaca.utils.camelCase(name).trim().toLowerCase();
  }

  public allSchemas(): Array<Schema> {
    return this.SCHEMAS;
  }

  public findSchema(schema: string): Schema | null {
    const allSchemas = this.allSchemas();
    const foundSchema = allSchemas.find((s) => s.equal(schema));

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
