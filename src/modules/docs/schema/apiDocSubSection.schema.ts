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
const ApiDocSubSectionSchema = SchemaFactory.createForClass(ApiDocSubSection);

ApiDocSubSectionSchema.set("toObject", { virtuals: true });
ApiDocSubSectionSchema.set("toJSON", { virtuals: true });

ApiDocSubSectionSchema.virtual("titleToShow").get(function () {
  return this.title.en;
});

export { ApiDocSubSectionSchema };
