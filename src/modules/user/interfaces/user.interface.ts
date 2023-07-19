import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";
import { Document } from "mongoose";
import { IDatasetModel } from "@modules/dataset-model/infrastructure/mongo/interfaces/model.interface";

export interface IUser extends Document {
  username: string;
  email: string | null;
  password: string | null;
  isSuperUser: boolean;
  datasetModels: IDatasetModel[];
  image: string | null;
  methodLogin: LOGIN_METHOD;
  limitDatasets: number;
  limitDocuments: number;
}
