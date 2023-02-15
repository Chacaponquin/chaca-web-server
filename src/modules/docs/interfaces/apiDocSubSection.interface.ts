import { LanguageOptions } from "@shared/interfaces/language.interface";
import { Document } from "mongoose";

export interface IApiDocSubSection extends Document {
  title: LanguageOptions;
  content: LanguageOptions;
  titleToShow: string;
}
