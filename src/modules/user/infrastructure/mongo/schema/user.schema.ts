import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import mongoose from "mongoose";
import { LOGIN_METHOD } from "../../../constants/LOGIN_METHOD.enum";
import { UserEmail } from "@modules/user/value-object";

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    type: mongoose.SchemaTypes.String,
  })
  username: string;

  @Prop({
    default: null,
    unique: true,
    type: mongoose.SchemaTypes.String,
    validate: {
      validator: (value: string) => {
        return UserEmail.emailRegex.test(value);
      },
    },
    required: true,
  })
  email: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  password: string | null;

  @Prop({ required: true, type: mongoose.SchemaTypes.Boolean })
  isSuperUser: boolean;

  @Prop({ default: [], ref: DB_MOELS.DATASET_MODEL })
  datasetModels: Array<mongoose.Types.ObjectId>;

  @Prop({ default: null, type: mongoose.SchemaTypes.String })
  image: string | null;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
    enum: Object.values(LOGIN_METHOD),
  })
  methodLogin: LOGIN_METHOD;
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

export { UserSchema };
