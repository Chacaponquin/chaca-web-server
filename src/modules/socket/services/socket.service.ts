import { DatasetModelService } from "@modules/dataset-model/services/dataset-model.service";
import { UserService } from "@modules/user/services/user.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ChacaDatasetTree } from "../modules/dataset_generator/classes/Tree";
import { InputConfig, UserSaveModelSchemaConfig } from "../dto/configDTO.dto";
import { InputDataset } from "../dto/datasetsDTO.dto";
import { DatasetGeneratorService } from "../modules/dataset_generator/services/dataset_generator.service";
import { FileGeneratorService } from "../modules/file_generator/services/file_generator.service";

@Injectable()
export class SocketService {
  constructor(
    private readonly datasetGeneratorService: DatasetGeneratorService,
    private readonly fileGeneratorService: FileGeneratorService,
    private readonly datasetModelService: DatasetModelService,
    private readonly userService: UserService,
  ) {}

  public async createDatasets(
    inputDatasets: Array<InputDataset>,
    config: InputConfig,
    userID: string,
  ): Promise<string> {
    const [data, datasetTrees] =
      this.datasetGeneratorService.createData(inputDatasets);
    const fileURL = await this.fileGeneratorService.createFile(data, config);
    await this.saveUserModelSchema(userID, config.saveSchema, datasetTrees);

    return fileURL;
  }

  private async saveUserModelSchema(
    userID: string,
    saveSchema: UserSaveModelSchemaConfig,
    datasetTrees: Array<ChacaDatasetTree>,
  ): Promise<void> {
    if (saveSchema && userID) {
      const { description, name, tags } = saveSchema;

      for (const dat of datasetTrees) {
        const newModelID = await this.datasetModelService.createModel({
          description,
          name,
          tags,
          author: userID,
          model: JSON.stringify(dat.getDatasetModel()),
        });

        await this.userService.setNewDatasetModel(userID, newModelID);
      }
    }
  }
}
