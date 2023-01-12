import { Document, Types } from "mongoose";

export interface IDatasetModel extends Document {
  name: string;
  data: any;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
}
