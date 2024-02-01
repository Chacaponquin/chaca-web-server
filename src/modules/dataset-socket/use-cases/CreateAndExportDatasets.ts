import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { CreateDatasets } from "./CreateDatasets";
import { schemas as chacaSchemas } from "chaca";
import { FileConfigDTO } from "@modules/dataset/dto/file";
import { FileExt } from "../value_object/file-config";
import { ExportSchemas, MultiSchema } from "../value_object/schemas";
import { S3Repository } from "@modules/dataset/infrastructure/s3/core";

interface Props {
  datasetsConfig: Array<InputDatasetDTO>;
  fileConfig: FileConfigDTO;
}

export class CreateAndExportDatasets {
  constructor(
    private readonly schemaOptionsServices: SchemaOptionsService,
    private readonly repository: S3Repository,
  ) {}

  public async execute({ datasetsConfig, fileConfig }: Props): Promise<string> {
    const createDatasetsCase = new CreateDatasets(this.schemaOptionsServices);
    const multiGenerateConfig = createDatasetsCase.buildSchemas(datasetsConfig);
    const path = await this._exportByConfig(multiGenerateConfig, fileConfig);

    const key = await this.repository.uploadDataset({ filePath: path });

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
