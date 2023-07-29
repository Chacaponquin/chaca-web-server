import { Injectable } from "@nestjs/common";
import {
  RespApiSchema,
  Schema,
  SchemaOption,
} from "../interfaces/options.interface";
import { chaca, schemas } from "chaca";
import { LanguageService } from "@shared/services/language.service";
import { SchemaOptionsRepository } from "./schema-options-repository.service";
import { OptionValueLimit } from "../value-object";

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
    const { isArray, ...args } = config;
    const limit = new OptionValueLimit(isArray).value;

    if (limit) {
      const allValues = [] as Array<unknown>;

      for (let i = 0; i < limit; i++) {
        allValues.push(option.schemaField().getValue(args));
      }

      return allValues;
    } else {
      return option.schemaField().getValue(args);
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
