import { Injectable } from "@nestjs/common";
import { RespApiSchema, Schema, SchemaOption } from "../interfaces/options";
import { chaca, schemas } from "chaca";
import { SchemaOptionsRepository } from "./schema-options-repository.service";
import { OptionValueLimit } from "../value-object";
import { ParamsObject } from "@modules/api/services/value-object";
import { LanguageService } from "@modules/app/modules/language/services/language.service";

@Injectable()
export class SchemaOptionsService {
  constructor(
    private readonly languageService: LanguageService,
    private readonly repository: SchemaOptionsRepository,
  ) {}

  public getAllSchemas(): Array<Schema> {
    return this.repository.getAllSchemas();
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

  public getApiSchemas(language: string): Array<RespApiSchema> {
    const returnOptions = [] as RespApiSchema[];
    const allSchemas = this.repository.getAllSchemas();

    for (const schema of allSchemas) {
      returnOptions.push({
        id: schemas.id.uuid().getValue(),
        name: schema.name,
        options: schema.options.map((o) => {
          const parent = chaca.utils.camelCase(schema.name);
          const name = chaca.utils.camelCase(o.name);
          const route = `/api/${parent}/${name}`;

          return {
            ...o,
            route,
            id: schemas.id.uuid().getValue(),
            description:
              o.description[this.languageService.filterLanguage(language)],
          };
        }),
      });
    }

    return returnOptions;
  }
}
