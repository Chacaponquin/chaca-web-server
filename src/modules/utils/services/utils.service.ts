import { Injectable } from "@nestjs/common";
import { RespApiOption } from "@modules/schema-options/interfaces/options.interface";
import { FILE_CONFIG } from "../constants/FILE_CONFIG";
import { ALL_FAQ } from "../constants/FAQ";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

@Injectable()
export class UtilsService {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  apiOptions(language: string): RespApiOption[] {
    return this.schemaOptionsService.getApiOptions(language);
  }

  fileConfig() {
    return FILE_CONFIG;
  }

  faq() {
    return ALL_FAQ;
  }
}
