import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { CreateDatasets } from "./CreateDatasets";
import { schemas as chacaSchemas } from "chaca";
import { FileConfigDTO } from "@modules/dataset/dto/file";
import { FileExt } from "../value_object/file_config";
import { ExportSchemas, MultiSchema } from "../value_object/schemas";

interface Props {
  datasetsConfig: Array<InputDatasetDTO>;
  fileConfig: FileConfigDTO;
}

export class CreateAndExportDatasets {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public async execute({ datasetsConfig, fileConfig }: Props): Promise<string> {
    const createDatasetsCase = new CreateDatasets(this.schemaOptionsServices);
    const multiGenerateConfig = createDatasetsCase.buildSchemas(datasetsConfig);
    return await this._exportByConfig(multiGenerateConfig, fileConfig);
  }

  private async _exportByConfig(
    schemas: MultiSchema,
    config: FileConfigDTO,
  ): Promise<string> {
    const fileExt = new FileExt(config.fileType);
    const fileName = chacaSchemas.id.uuid().getValue();

    const exportSchemas = new ExportSchemas(schemas.schemas);

    const path = await exportSchemas.generate({
      filename: fileName,
      extension: fileExt.value,
    });

    return path.split("\\").at(-1) as string;
  }
}
