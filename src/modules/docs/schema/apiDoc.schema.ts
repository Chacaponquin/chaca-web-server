import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import {
  DEFAULT_LANGUAGE_OPTIONS,
  LanguageOptions,
} from "@shared/interfaces/language.interface";
import mongoose from "mongoose";

@Schema({ timestamps: true })
class ApiDoc {
  @Prop({ default: DEFAULT_LANGUAGE_OPTIONS, type: mongoose.SchemaTypes.Mixed })
  sectionTitle: LanguageOptions;
  @Prop({
    default: [],
    type: [
      { type: mongoose.Types.ObjectId, ref: DB_MOELS.API_DOCS_SUB_SECTION },
    ],
  })
  subSections: Array<mongoose.Types.ObjectId>;
}

const ApiDocSchema = SchemaFactory.createForClass(ApiDoc);

ApiDocSchema.set("toObject", { virtuals: true });
ApiDocSchema.set("toJSON", { virtuals: true });

ApiDocSchema.virtual("titleToShow").get(function () {
  return this.sectionTitle.en;
});

ApiDocSchema.virtual("frontRoute").get(function () {
  const initString = this.sectionTitle.en.toLowerCase().trim();
  const splitString = initString.split(" ").join("-");

  return splitString;
});

export { ApiDocSchema };
