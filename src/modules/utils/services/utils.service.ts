import { Injectable } from "@nestjs/common";
import { ApiOption } from "@shared/interfaces/options.interface";
import { chaca } from "chaca";
import ChacaOptions from "@shared/constants/options";
import { FILE_CONFIG } from "../constants/FILE_CONFIG";
import { ALL_FAQ } from "../constants/FAQ";

@Injectable()
export class UtilsService {
  apiOptions(): ApiOption[] {
    const returnOptions = [] as ApiOption[];

    for (const [key, options] of Object.entries(ChacaOptions)) {
      returnOptions.push({
        options: options.map((el) => {
          const parent = chaca.utils.camelCaseText(key);
          const name = chaca.utils.camelCaseText(el.name);
          const route = `/api/${parent}/${name}`;

          return { ...el, route };
        }),
        parent: key,
      });
    }

    return returnOptions;
  }

  fileConfig() {
    return FILE_CONFIG;
  }

  faq() {
    return ALL_FAQ;
  }
}
