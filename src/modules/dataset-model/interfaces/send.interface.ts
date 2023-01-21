import { Types } from "mongoose";

export interface SendDatasetModel {
  _id: string;
  name: string;
  model: string;
  likes: Types.ObjectId[];
  tags: Array<string>;
  description: string;
}
