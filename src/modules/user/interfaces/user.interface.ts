import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";
import { Types, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string | null;
  password: string | null;
  isSuperUser: boolean;
  datasetModels: Types.ObjectId[];
  image: string | null;
  methodLogin: LOGIN_METHOD;
}
