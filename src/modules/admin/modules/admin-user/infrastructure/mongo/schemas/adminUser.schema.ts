import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class AdminUser {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
}

const AdminUserSchema = SchemaFactory.createForClass(AdminUser);

export { AdminUserSchema };
