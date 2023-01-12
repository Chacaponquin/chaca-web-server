import mongoose from "mongoose";

export interface IUserMessage extends mongoose.Document {
  name: string;
  userEmail: string;
  message: string;
}
