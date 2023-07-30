import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS";
import mongoose from "mongoose";

@Schema()
class DatasetModel {
  @Prop({ required: true })
  name: string;
  @Prop({ default: "" })
  descripttion: string;
  @Prop({ required: true })
  model: string;
  @Prop({ required: true, ref: DB_MOELS.USERS })
  author: mongoose.Types.ObjectId;
  @Prop({ default: [], ref: DB_MOELS.USERS })
  likes: Array<mongoose.Types.ObjectId>;
  @Prop({ default: [] })
  tags: Array<string>;
}
export const DatasetModelSchema = SchemaFactory.createForClass(DatasetModel);
