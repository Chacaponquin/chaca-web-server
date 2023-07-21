import { Injectable } from "@nestjs/common";
import { RespApiSchema, SchemaOption } from "../interfaces/options.interface";
import { chaca, schemas } from "chaca";
import { LanguageService } from "@shared/services/language.service";
import { SchemaOptionsRepository } from "./schema-options-repository.service";

@Injectable()
export class SchemaOptionsService {
  constructor(
    private readonly languageService: LanguageService,
    private readonly repository: SchemaOptionsRepository,
  ) {}

  public findSchemaOption(schema: string, option: string): SchemaOption {
    return this.repository.findSchemaOption(schema, option);
  }

  public generateValueByConfig(
    option: SchemaOption,
    config: any,
  ): unknown | unknown[] {
    const { isArray, ...args } = config;

    if (
      isArray &&
      typeof Number(isArray) === "number" &&
      Number(isArray) >= 0 &&
      Number(isArray) <= 300
    ) {
      const allValues = [] as Array<unknown>;
      const limit = Number(isArray);

      for (let i = 0; i < limit; i++) {
        allValues.push(option.schemaField.getValue(args));
      }

      return allValues;
    } else {
      return option.schemaField.getValue(args);
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
          const parent = chaca.utils.camelCaseText(schema.name);
          const name = chaca.utils.camelCaseText(o.name);
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
