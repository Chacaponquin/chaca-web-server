import { Document } from "mongoose";

export interface IUserMessage extends Document {
  title: string;
  email: string;
  message: string;
}
