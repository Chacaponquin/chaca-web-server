import { Injectable, StreamableFile } from "@nestjs/common";
import { InputDatasetDTO, InputDatasetFieldDTO } from "../dto/dataset";
import {
  BuildSchemas,
  ChacaSchemaBuilder,
  CreateDatasets,
  CreateDocuments,
  CreateSingleDocument,
} from "./cases";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { MultiSchema, Schema } from "./value_object/schemas";
import { DatasetRepository } from "./dataset-repository.service";

interface CreateDatasetProps {
  datasetFields: Array<InputDatasetFieldDTO>;
  count: number;
}

interface DownloadProps {
  key: string;
}

interface UploadDataset {
  filePath: string;
}

@Injectable()
export class DatasetService {
  constructor(
    private readonly schemaOptionsServices: SchemaOptionsService,
    private readonly repository: DatasetRepository,
  ) {}

  public async downloadDataset({
    key,
  }: DownloadProps): Promise<StreamableFile> {
    return await this.repository.downloadDataset({ key });
  }

  public createDatasets(datasetsConfig: Array<InputDatasetDTO>) {
    const useCase = new CreateDatasets(this.schemaOptionsServices);
    return useCase.execute(datasetsConfig);
  }

  public async createSingleDocument(fields: Array<InputDatasetFieldDTO>) {
    const useCase = new CreateSingleDocument(this.schemaOptionsServices);
    return await useCase.execute(fields);
  }

  public createDocuments({ count, datasetFields }: CreateDatasetProps) {
    const useCase = new CreateDocuments(this.schemaOptionsServices);
    return useCase.execute({ count, fields: datasetFields });
  }

  public buildSchema(datasetFields: Array<InputDatasetFieldDTO>): Schema {
    const serviceCase = new ChacaSchemaBuilder(this.schemaOptionsServices);
    return serviceCase.execute(datasetFields);
  }

  public async uploadDataset({ filePath }: UploadDataset) {
    return await this.repository.uploadDataset({ filePath: filePath });
  }

  public buildSchemas(datasetsConfig: Array<InputDatasetDTO>): MultiSchema {
    const serviceCase = new BuildSchemas(this.schemaOptionsServices);
    return serviceCase.execute(datasetsConfig);
  }
}
