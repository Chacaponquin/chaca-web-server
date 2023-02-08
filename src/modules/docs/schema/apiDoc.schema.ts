import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ApiDocSubSection } from "../interfaces/apiSections.interface";

@Schema()
class ApiDoc {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  sectionTitle: string;
  @Prop({ required: true, default: [], type: Array<ApiDocSubSection> })
  subSections: Array<ApiDocSubSection>;
}
export const ApiDocSchema = SchemaFactory.createForClass(ApiDoc);
