import { Injectable, StreamableFile } from "@nestjs/common";
import { FILE_CONFIG } from "../constants/FILE_CONFIG";
import { ALL_FAQ } from "../constants/FAQ";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ApiArgument, ApiSchema, ApiSchemaOption } from "../dto/schema";
import { DatasetService } from "@modules/dataset/services/dataset.service";

@Injectable()
export class WebApiService {
  private FILE_CONFIG = FILE_CONFIG;
  private ALL_FAQ = ALL_FAQ;

  constructor(
    private readonly schemaOptionsService: SchemaOptionsService,
    private readonly datasetServices: DatasetService,
  ) {}

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

  async fileToDownload(key: string): Promise<StreamableFile> {
    return await this.datasetServices.downloadDataset({ key: key });
  }
}
