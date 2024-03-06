import { UserMessageUserEmail } from "@modules/user-message/value-object";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
class UserMessage {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  title: string;

  @Prop({
    required: true,
    validate: {
      validator: (value) => {
        return UserMessageUserEmail.emailRegex.test(value);
      },
    },
    type: mongoose.SchemaTypes.String,
  })
  email: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  message: string;
}

export const UserMessageSchema = SchemaFactory.createForClass(UserMessage);

export type IUserMessage = UserMessage & Document;
