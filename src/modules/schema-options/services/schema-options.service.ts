import { Injectable } from "@nestjs/common";
import ChacaOptions from "../constants";
import { ApiOption, RespApiOption } from "../interfaces/options.interface";
import { chaca, schemas } from "chaca";
import { SharedService } from "@shared/services/shared.service";

@Injectable()
export class SchemaOptionsService {
  constructor(private readonly sharedService: SharedService) {}

  getSchemas(): Array<ApiOption> {
    const allSchemas = [] as ApiOption[];

    for (const [parent, options] of Object.entries(ChacaOptions)) {
      allSchemas.push({ options, parent });
    }

    return allSchemas;
  }

  getApiOptions(language: string): Array<RespApiOption> {
    const returnOptions = [] as RespApiOption[];

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
