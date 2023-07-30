import { LOGIN_METHOD } from "../../../constants/LOGIN_METHOD.enum";
import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string | null;
  isSuperUser: boolean;
  datasetModels: Array<string>;
  image: string | null;
  methodLogin: LOGIN_METHOD;
}
