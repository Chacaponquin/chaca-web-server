import { IUser } from "@modules/user/infrastructure/mongo/schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS";
import mongoose, { Document } from "mongoose";

@Schema()
class DatasetModel {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({ default: "", type: mongoose.SchemaTypes.String, required: false })
  descripttion: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  model: string;

  @Prop({
    required: true,
    ref: DB_MOELS.USERS,
    type: mongoose.SchemaTypes.ObjectId,
  })
  author: IUser;

  @Prop({
    default: [],
    ref: DB_MOELS.USERS,
    type: mongoose.SchemaTypes.Array,
    required: false,
  })
  likes: Array<mongoose.Types.ObjectId>;

  @Prop({ type: mongoose.SchemaTypes.Array, default: [], required: false })
  tags: Array<string>;

  @Prop({ type: mongoose.SchemaTypes.String, required: false, default: "" })
  description: string;
}

export const DatasetModelSchema = SchemaFactory.createForClass(DatasetModel);
export type IDatasetModel = DatasetModel & Document;
