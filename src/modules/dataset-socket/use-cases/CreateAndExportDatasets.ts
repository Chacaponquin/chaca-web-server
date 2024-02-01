import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { schemas as chacaSchemas } from "chaca";
import { FileConfigDTO } from "@modules/dataset/dto/file";
import { FileExt } from "@modules/dataset/services/value_object/file-config";
import {
  ExportSchemas,
  MultiSchema,
} from "@modules/dataset/services/value_object/schemas";
import { DatasetService } from "@modules/dataset/services/dataset.service";

interface Props {
  datasetsConfig: Array<InputDatasetDTO>;
  fileConfig: FileConfigDTO;
}

export class CreateAndExportDatasets {
  constructor(private readonly datasetServices: DatasetService) {}

  public async execute({ datasetsConfig, fileConfig }: Props): Promise<string> {
    const multiGenerateConfig =
      this.datasetServices.buildSchemas(datasetsConfig);
    const path = await this._exportByConfig(multiGenerateConfig, fileConfig);

    const key = await this.datasetServices.uploadDataset({ filePath: path });

    return key;
  }

  private async _exportByConfig(
    schemas: MultiSchema,
    config: FileConfigDTO,
  ): Promise<string> {
    const fileExt = new FileExt(config.fileType);
    const filename = `Dataset${chacaSchemas.id.uuid().getValue()}`;

    const exportSchemas = new ExportSchemas(schemas.schemas);

    const path = await exportSchemas.generate({
      filename: filename,
      extension: fileExt.value,
    });

    return path;
  }
}
