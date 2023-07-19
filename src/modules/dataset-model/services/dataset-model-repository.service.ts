import { Injectable } from "@nestjs/common";
import { DatasetModelMongoRepository } from "../infrastructure/mongo/dataset-model-mongo-repository.service";
import { DatasetModel } from "../domain/DatasetModel";
import { CreateModelDTO } from "../dto/createModel.dto";

@Injectable()
export class DatasetModelRepository {
  constructor(private readonly mongoRepository: DatasetModelMongoRepository) {}

  async deleteModel(modelID: string): Promise<void> {
    await this.mongoRepository.deleteModel(modelID);
  }

  async getAll(): Promise<Array<DatasetModel>> {
    return await this.mongoRepository.getAll();
  }

  async create(createModelDTO: CreateModelDTO): Promise<DatasetModel> {
    return await this.mongoRepository.createModel(createModelDTO);
  }
}
