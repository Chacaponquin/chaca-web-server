import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
class DatasetModel {
  @Prop()
  name: string;
  @Prop()
  model: string;
  @Prop()
  author: mongoose.Types.ObjectId;
  @Prop()
  likes: mongoose.Types.ObjectId[];
}
export const DatasetModelSchema = SchemaFactory.createForClass(DatasetModel);
