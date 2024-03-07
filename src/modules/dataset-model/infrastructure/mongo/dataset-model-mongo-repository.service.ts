import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { DatasetModel } from "@modules/dataset-model/domain";
import { CreateModelDTO } from "@modules/dataset-model/dto/create";
import { IDatasetModel } from "./schema";

@Injectable()
export class DatasetModelMongoRepository {
  constructor(
    @InjectModel(DB_MOELS.DATASET_MODEL)
    private readonly model: Model<IDatasetModel>,
  ) {}

  async deleteModel(modelID: string): Promise<void> {
    await this.model.deleteOne({ id: modelID });
  }

  async getAll(): Promise<Array<DatasetModel>> {
    const allModels = await this.model.find();
    return allModels.map((m) => this.map(m));
  }

  async createModel(createModelDTO: CreateModelDTO): Promise<DatasetModel> {
    const { author, description, model, name, tags } = createModelDTO;

    const newModel = new this.model({
      name,
      author,
      description,
      model,
      tags,
    });

    try {
      const returnModel = this.map(newModel);
      await newModel.save();

      return returnModel;
    } catch (error) {
      await this.deleteModel(newModel.id);
      throw error;
    }
  }

  public map(mongoModel: IDatasetModel): DatasetModel {
    return new DatasetModel({
      id: mongoModel.id,
      description: mongoModel.description,
      likes: mongoModel.likes.map((l) => l.toString()),
      model: mongoModel.model,
      name: mongoModel.name,
      tags: mongoModel.tags,
    });
  }

  public async findById(modelId: string): Promise<DatasetModel | null> {
    const found = await this.model.findById(modelId);
    return found === null ? null : this.map(found);
  }
}
