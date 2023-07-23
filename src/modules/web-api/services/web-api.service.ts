import { Injectable } from "@nestjs/common";
import { RespApiSchema } from "@modules/schema-options/interfaces/options.interface";
import { FILE_CONFIG } from "../constants/FILE_CONFIG";
import { ALL_FAQ } from "../constants/FAQ";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

@Injectable()
export class WebApiService {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  getApiSchemas(language: string): RespApiSchema[] {
    return this.schemaOptionsService.getApiSchemas(language);
  }

  fileConfig() {
    return FILE_CONFIG;
  }

  faq() {
    return ALL_FAQ;
  }
}
