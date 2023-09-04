import { UserMessageUserEmail } from "@modules/user-message/value-object";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class UserMessage {
  @Prop({ required: true })
  title: string;
  @Prop({
    required: true,
    validate: {
      validator: (value) => {
        return UserMessageUserEmail.emailRegex.test(value);
      },
    },
  })
  email: string;
  @Prop({ required: true })
  message: string;
}
export const UserMessageSchema = SchemaFactory.createForClass(UserMessage);
