import { Injectable } from "@nestjs/common";
import { SchemaOption } from "../interfaces/options";
import { SCHEMAS } from "../constants";
import { chaca } from "chaca";
import { NotFoundOptionError, NotFoundSchemaError } from "../exceptions";
import { Schema } from "../domain";

@Injectable()
export class SchemaOptionsRepository {
  private SCHEMAS: Array<Schema> = SCHEMAS;

  private _stringToCompareName(name: string): string {
    return chaca.utils.camelCase(name).trim().toLowerCase();
  }

  public getAllSchemas(): Array<Schema> {
    return this.SCHEMAS;
  }

  public findSchema(schema: string): Schema | null {
    const allSchemas = this.getAllSchemas();
    const foundSchema = allSchemas.find(
      (s) =>
        this._stringToCompareName(s.name) === this._stringToCompareName(schema),
    );

    return foundSchema ? foundSchema : null;
  }

  public findSchemaOption(schema: string, option: string): SchemaOption {
    const foundSchema = this.findSchema(schema);

    if (foundSchema) {
      const findOption = foundSchema.options.find(
        (o) => chaca.utils.camelCase(o.name) === chaca.utils.camelCase(option),
      );

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
