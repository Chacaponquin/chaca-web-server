import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { CreateDatasets } from "./CreateDatasets";
import { MultiGenerateSchema, chaca, schemas as chacaSchemas } from "chaca";
import { FileConfigDTO } from "@modules/dataset/dto/file";
import { FileExt } from "../value_object/file_config";
import * as path from "path";

export class CreateAndExportDatasets {
  private readonly PUBLIC_ROUTE = "../../../../data";

  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public async execute(
    datasetsConfig: Array<InputDatasetDTO>,
    fileConfig: FileConfigDTO,
  ): Promise<string> {
    const createDatasetCase = new CreateDatasets(this.schemaOptionsServices);
    const multiGenerateConfig = createDatasetCase.buildSchemas(datasetsConfig);
    return await this.exportByConfig(multiGenerateConfig, fileConfig);
  }

  private async exportByConfig(
    schemas: Array<MultiGenerateSchema>,
    config: FileConfigDTO,
  ): Promise<string> {
    const fileExt = new FileExt(config.fileType);

    const fileURL = await chaca.exportFromSchemas(
      schemas,
      {
        format: fileExt.chacaFile,
        location: path.join(__dirname, this.PUBLIC_ROUTE),
        fileName: chacaSchemas.id.uuid().getValue(),
      },
      { verbose: false },
    );

    return fileURL;
  }
}
