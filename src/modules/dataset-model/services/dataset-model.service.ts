import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { Model } from "mongoose";
import { IDatasetModel } from "../interfaces/dataset-model.interface";

@Injectable()
export class DatasetModelService {
  constructor(
    @InjectModel(DB_MOELS.DATASET_MODEL)
    private readonly model: Model<IDatasetModel>,
  ) {}

  async deleteModel(modelID: string): Promise<void> {
    await this.model.findByIdAndDelete(modelID);
  }
}
