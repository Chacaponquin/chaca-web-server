import { Injectable, StreamableFile } from "@nestjs/common";
import { InputDatasetDTO, InputDatasetFieldDTO } from "../dto/dataset";
import {
  ChacaSchemaBuilder,
  CreateAndExportDatasets,
  CreateDatasets,
  CreateDocuments,
  CreateSingleDocument,
} from "./cases";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { FileConfigDTO } from "../dto/file";
import { Schema } from "./value_object/schemas";
import { S3Repository } from "../infrastructure/s3/core";

interface CreateDatasetProps {
  datasetFields: Array<InputDatasetFieldDTO>;
  count: number;
}

interface DownloadProps {
  key: string;
}

@Injectable()
export class DatasetService {
  constructor(
    private readonly schemaOptionsServices: SchemaOptionsService,
    private readonly repository: S3Repository,
  ) {}

  public async downloadDataset({
    key,
  }: DownloadProps): Promise<StreamableFile> {
    return await this.repository.downloadDataset(key);
  }

  public createDatasets(datasetsConfig: Array<InputDatasetDTO>) {
    const useCase = new CreateDatasets(this.schemaOptionsServices);
    return useCase.execute(datasetsConfig);
  }

  public async createSingleDocument(
    datasetFields: Array<InputDatasetFieldDTO>,
  ) {
    const useCase = new CreateSingleDocument(this.schemaOptionsServices);
    return await useCase.execute(datasetFields);
  }

  public createDocuments({ count, datasetFields }: CreateDatasetProps) {
    const useCase = new CreateDocuments(this.schemaOptionsServices);
    return useCase.execute({ count, fields: datasetFields });
  }

  public buildSchema(datasetFields: Array<InputDatasetFieldDTO>): Schema {
    const useCase = new ChacaSchemaBuilder(this.schemaOptionsServices);
    return useCase.execute(datasetFields);
  }

  public async createAndExportDatasets(
    datasetsConfig: Array<InputDatasetDTO>,
    fileConfig: FileConfigDTO,
  ): Promise<string> {
    const useCase = new CreateAndExportDatasets(
      this.schemaOptionsServices,
      this.repository,
    );

    return await useCase.execute({ datasetsConfig, fileConfig });
  }
}
