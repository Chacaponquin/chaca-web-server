import { Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { FILE_CONFIG } from "../constants/FILE_CONFIG";
import { ALL_FAQ } from "../constants/FAQ";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import * as path from "path";
import * as fs from "fs";
import { ApiArgument, ApiSchema, ApiSchemaOption } from "../dto/schema";

@Injectable()
export class WebApiService {
  private FILE_CONFIG = FILE_CONFIG;
  private ALL_FAQ = ALL_FAQ;

  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  getApiSchemas(): ApiSchema[] {
    const schemas = this.schemaOptionsService.allSchemas();
    const returnSchemas = [] as Array<ApiSchema>;

    for (const s of schemas) {
      const saveOptions: Array<ApiSchemaOption> = s.options.map((o) => {
        const saveArguments: Array<ApiArgument> = [];

        for (const arg of o.arguments) {
          saveArguments.push({
            argument: arg.argument,
            inputType: arg.inputType,
            selectValues: arg.selectValues,
          });
        }

        return { arguments: saveArguments, name: o.name, showName: o.showName };
      });

      returnSchemas.push({
        name: s.name,
        options: saveOptions,
        showName: s.showName,
      });
    }

    return returnSchemas;
  }

  fileConfig() {
    return this.FILE_CONFIG;
  }

  faq() {
    return this.ALL_FAQ;
  }

  async fileToDownload(fileName: string): Promise<StreamableFile> {
    try {
      const filePath = path.join(__dirname, "../../../data", fileName);
      const file = fs.createReadStream(filePath);

      const stream = new StreamableFile(file);

      await fs.promises.unlink(filePath);

      return stream;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
