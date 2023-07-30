import { Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { RespApiSchema } from "@modules/schema-options/interfaces/options";
import { FILE_CONFIG } from "../constants/FILE_CONFIG";
import { ALL_FAQ } from "../constants/FAQ";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class WebApiService {
  private FILE_CONFIG = FILE_CONFIG;
  private ALL_FAQ = ALL_FAQ;

  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  getApiSchemas(language: string): RespApiSchema[] {
    return this.schemaOptionsService.getApiSchemas(language);
  }

  fileConfig() {
    return this.FILE_CONFIG;
  }

  faq() {
    return this.ALL_FAQ;
  }

  fileToDownload(fileName: string) {
    try {
      const file = fs.createReadStream(
        path.join(__dirname, "../../../data", fileName),
      );
      return new StreamableFile(file);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
