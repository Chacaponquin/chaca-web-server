import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { Model, Types } from "mongoose";
import { CreateModelDTO } from "../dto/createModel.dto";
import { IDatasetModel } from "../interfaces/dataset-model.interface";
import * as prettier from "prettier";
import { SendDatasetModel } from "../interfaces/send.interface";

@Injectable()
export class DatasetModelService {
  constructor(
    @InjectModel(DB_MOELS.DATASET_MODEL)
    private readonly model: Model<IDatasetModel>,
  ) {}

  async deleteModel(modelID: string): Promise<void> {
    await this.model.findByIdAndDelete(modelID);
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

  async createModel(modelDTO: CreateModelDTO): Promise<Types.ObjectId> {
    const { author, description, model, name, tags } = modelDTO;

    const newModel = new this.model({
      name,
      author,
      description,
      model,
      tags,
    });

    await newModel.save();

    return newModel._id;
  }
}
