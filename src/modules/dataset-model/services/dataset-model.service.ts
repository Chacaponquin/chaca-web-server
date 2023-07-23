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
    return this.repository.create(modelDTO);
  }
}
