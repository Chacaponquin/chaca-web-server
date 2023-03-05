import { Injectable } from "@nestjs/common";
import ChacaOptions from "../constants";
import {
  ApiSchema,
  RespApiSchema,
  SubOption,
} from "../interfaces/options.interface";
import { chaca, schemas } from "chaca";
import { SharedService } from "@shared/services/shared.service";
import { NotFoundOptionError, NotFoundSchemaError } from "../errors";

@Injectable()
export class SchemaOptionsService {
  constructor(private readonly sharedService: SharedService) {}

  getSchemas(): Array<ApiSchema> {
    const allSchemas = [] as ApiSchema[];

    for (const [parent, options] of Object.entries(ChacaOptions)) {
      allSchemas.push({ options, parent });
    }

    return allSchemas;
  }

  generateValueByConfig(option: SubOption, config: any): unknown | unknown[] {
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
        allValues.push(option.getValue(args));
      }

      return allValues;
    } else {
      return option.getValue(args);
    }
  }

  findOption(schema: string, option: string): SubOption {
    const schemas = this.getSchemas();

    const findSchema = schemas.find(
      (s) =>
        chaca.utils.camelCaseText(s.parent).toLowerCase() ===
        chaca.utils.camelCaseText(schema).toLowerCase(),
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
        throw new NotFoundOptionError();
      }
    } else {
      throw new NotFoundSchemaError();
    }
  }

  getApiSchemas(language: string): Array<RespApiSchema> {
    const returnOptions = [] as RespApiSchema[];

    for (const [key, options] of Object.entries(ChacaOptions)) {
      returnOptions.push({
        id: schemas.id.uuid().getValue(),
        parent: key,
        options: options.map((o) => {
          const parent = chaca.utils.camelCaseText(key);
          const name = chaca.utils.camelCaseText(o.name);
          const route = `/api/${parent}/${name}`;

          return {
            ...o,
            route,
            id: schemas.id.uuid().getValue(),
            description:
              o.description[this.sharedService.filterLanguage(language)],
          };
        }),
      });
    }

    return returnOptions;
  }
}
