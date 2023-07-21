import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class UserMessage {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  userEmail: string;
  @Prop({ required: true })
  message: string;
}
export const UserMessageSchema = SchemaFactory.createForClass(UserMessage);
