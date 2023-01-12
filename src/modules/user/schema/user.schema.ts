import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/enums/DB_MODELS.enum";
import mongoose from "mongoose";
import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";

@Schema()
export class User {
  @Prop({ required: true, maxlength: 25, minlength: 5 })
  username: string;
  @Prop({ default: null })
  email: string | null;
  @Prop({ default: null })
  password: string | null;
  @Prop({ default: false })
  isSuperUser: boolean;
  @Prop({ default: [], ref: DB_MOELS.DATASET_MODEL })
  datasetModels: Array<mongoose.Types.ObjectId>;
  @Prop()
  image: string | null;
  @Prop({ required: true })
  methodLogin: LOGIN_METHOD;
}
export const UserSchema = SchemaFactory.createForClass(User);
