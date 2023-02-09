import { Document } from "mongoose";

export interface IAdminUser extends Document {
  username: string;
  password: string;
  email: string;
}
