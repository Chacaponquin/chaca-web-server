import { Injectable } from "@nestjs/common";
import { CreateModelDTO } from "../dto/createModel.dto";
import { IDatasetModel } from "../infrastructure/mongo/interfaces/model.interface";
import * as prettier from "prettier";
import { DatasetModelRepository } from "./dataset-model-repository.service";
import { DatasetModel } from "../domain/DatasetModel";

@Injectable()
export class DatasetModelService {
  constructor(private readonly repository: DatasetModelRepository) {}

  async deleteModel(modelID: string): Promise<void> {
    await this.repository.deleteModel(modelID);
  }

  getModelToSendClient(
    datasetModels: Array<IDatasetModel>,
  ): Array<SendDatasetModel> {
    return datasetModels.map((d) => {
      return {
        _id: d.id,
        name: d.name,
        likes: d.likes,
        tags: d.tags,
        description: d.description,
        model: prettier.format(d.model, { parser: "json" }),
      };
    });
  }

  async createModel(modelDTO: CreateModelDTO): Promise<DatasetModel> {
    return this.repository.create(modelDTO);
  }
}
