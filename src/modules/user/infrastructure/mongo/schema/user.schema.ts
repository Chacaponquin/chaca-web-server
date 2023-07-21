import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import mongoose from "mongoose";
import { LOGIN_METHOD } from "../../../constants/LOGIN_METHOD.enum";

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    type: mongoose.SchemaTypes.String,
  })
  username: string;
  @Prop({ default: null, unique: true, type: mongoose.SchemaTypes.String })
  email: string | null;
  @Prop({ type: mongoose.SchemaTypes.String })
  password: string | null;
  @Prop({ default: false })
  isSuperUser: boolean;
  @Prop({ default: [], ref: DB_MOELS.DATASET_MODEL })
  datasetModels: Array<mongoose.Types.ObjectId>;
  @Prop({ default: null, type: mongoose.SchemaTypes.String })
  image: string | null;
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  methodLogin: LOGIN_METHOD;
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

export { UserSchema };
