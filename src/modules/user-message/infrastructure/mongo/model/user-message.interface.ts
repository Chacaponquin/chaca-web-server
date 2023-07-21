import { Document } from "mongoose";

export interface IUserMessage extends Document {
  name: string;
  userEmail: string;
  message: string;
}
