import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import mongoose from "mongoose";
import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";
import {
  NORMAL_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";

@Schema()
export class User {
  @Prop({ required: true, maxlength: 25, minlength: 5, unique: true })
  username: string;
  @Prop({ default: null, unique: true })
  email: string | null;
  @Prop({ default: null })
  password: string | null;
  @Prop({ default: false })
  isSuperUser: boolean;
  @Prop({ default: [], ref: DB_MOELS.DATASET_MODEL })
  datasetModels: Array<mongoose.Types.ObjectId>;
  @Prop({ default: null })
  image: string | null;
  @Prop({ required: true })
  methodLogin: LOGIN_METHOD;
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

UserSchema.virtual("limitDatasets").get(function () {
  if (this.isSuperUser) return SUPER_USER_LIMITS.LIMIT_DATASETS;
  else return NORMAL_USER_LIMITS.LIMIT_DATASETS;
});
UserSchema.virtual("limitDocuments").get(function () {
  if (this.isSuperUser) return SUPER_USER_LIMITS.LIMIT_DOCUMENTS;
  else return NORMAL_USER_LIMITS.LIMIT_DOCUMENTS;
});

export { UserSchema };
