import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { FileConfigDTO } from "@modules/dataset/dto/file";
import { InputDatasetDTO } from "@modules/dataset/dto/dataset";

@Injectable()
export class SocketService {
  constructor(private readonly datasetService: DatasetService) {}

  public async createDatasets(
    inputDatasets: Array<InputDatasetDTO>,
    fileConfig: FileConfigDTO,
  ): Promise<string> {
    return await this.datasetService.createAndExportDatasets(
      inputDatasets,
      fileConfig,
    );
  }
}
