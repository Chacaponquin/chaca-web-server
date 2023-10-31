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
    const createDatasetsCase = new CreateDatasets(this.schemaOptionsServices);
    const multiGenerateConfig = createDatasetsCase.buildSchemas(datasetsConfig);
    return await this._exportByConfig(multiGenerateConfig, fileConfig);
  }

  private async _exportByConfig(
    schemas: Array<MultiGenerateSchema>,
    config: FileConfigDTO,
  ): Promise<string> {
    const fileExt = new FileExt(config.fileType);
    const fileName = chacaSchemas.id.uuid().getValue();

    const filePath = await chaca.exportFromSchemas(
      schemas,
      {
        format: fileExt.value,
        location: path.join(__dirname, this.PUBLIC_ROUTE),
        fileName: fileName,
      },
      { verbose: false },
    );

    return filePath.split("\\").at(-1) as string;
  }
}
