import { LanguageOptions } from "@shared/interfaces/language.interface";
import { Document } from "mongoose";
import { IApiDocSubSection } from "./apiDocSubSection.interface";

export interface IApiDoc extends Document {
  sectionTitle: LanguageOptions;
  subSections: Array<string>;
  titleToShow: string;
  frontRoute: string;
}

export interface IApiDocPopulated extends Omit<IApiDoc, "subSections"> {
  subSections: Array<IApiDocSubSection>;
}
