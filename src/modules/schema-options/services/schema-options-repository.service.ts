import { Injectable } from "@nestjs/common";
import { Schema, SchemaOption } from "../interfaces/options.interface";
import { SCHEMAS } from "../constants";
import { chaca } from "chaca";
import { NotFoundOptionError, NotFoundSchemaError } from "../exceptions";

@Injectable()
export class SchemaOptionsRepository {
  public getAllSchemas(): Array<Schema> {
    return SCHEMAS;
  }

  public findSchemaOption(schema: string, option: string): SchemaOption {
    const allSchemas = this.getAllSchemas();

    const findSchema = allSchemas.find(
      (s) =>
        chaca.utils.camelCaseText(s.name).trim().toLowerCase() ===
        chaca.utils.camelCaseText(schema).trim().toLowerCase(),
    );

    if (findSchema) {
      const findOption = findSchema.options.find(
        (o) =>
          chaca.utils.camelCaseText(o.name) ===
          chaca.utils.camelCaseText(option),
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
