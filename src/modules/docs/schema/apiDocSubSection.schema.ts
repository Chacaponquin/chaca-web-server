import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  DEFAULT_LANGUAGE_OPTIONS,
  LanguageOptions,
} from "@shared/interfaces/language.interface";
import mongoose from "mongoose";

@Schema({ timestamps: true })
class ApiDocSubSection {
  @Prop({ default: DEFAULT_LANGUAGE_OPTIONS, type: mongoose.SchemaTypes.Mixed })
  title: LanguageOptions;
  @Prop({ default: DEFAULT_LANGUAGE_OPTIONS, type: mongoose.SchemaTypes.Mixed })
  content: LanguageOptions;
}
export const ApiDocSubSectionSchema =
  SchemaFactory.createForClass(ApiDocSubSection);
