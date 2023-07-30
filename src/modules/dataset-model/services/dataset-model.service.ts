import { Injectable } from "@nestjs/common";
import { CreateModelDTO } from "../dto/createModel.dto";
import { DatasetModelRepository } from "./dataset-model-repository.service";
import { DatasetModel } from "../domain/DatasetModel";

@Injectable()
export class DatasetModelService {
  constructor(private readonly repository: DatasetModelRepository) {}

  async deleteModel(modelID: string): Promise<void> {
    await this.repository.deleteModel(modelID);
  }

  async createModel(modelDTO: CreateModelDTO): Promise<DatasetModel> {
    const newModel = await this.repository.create(modelDTO);
    return newModel;
  }

  async findModelsById(
    userModelsId: Array<string>,
  ): Promise<Array<DatasetModel>> {
    const returnDatasets = [] as Array<DatasetModel>;

    for (const modelID of userModelsId) {
      const found = await this.repository.findById(modelID);
      if (found) {
        returnDatasets.push(found);
      }
    }

    return returnDatasets;
  }
}
