import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  email: string | null;
  @Prop()
  password: string | null;
  @Prop()
  isSuperUser: boolean;
  @Prop()
  datasetsSchemas: Array<mongoose.Types.ObjectId>;
  @Prop()
  image: string | null;
  @Prop()
  methodLogin: LOGIN_METHOD;
}
export const UserSchema = SchemaFactory.createForClass(User);
