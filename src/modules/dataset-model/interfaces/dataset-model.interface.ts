import { Document, Types } from "mongoose";

export interface IDatasetModel extends Document {
  name: string;
  model: string;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  tags: Array<string>;
  description: string;
}
