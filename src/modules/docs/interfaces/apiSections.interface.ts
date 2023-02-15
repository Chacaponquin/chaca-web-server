import { LanguageOptions } from "@shared/interfaces/language.interface";
import { Document } from "mongoose";
import { IApiDocSubSection } from "./apiDocSubSection.interface";

export interface ApiSection {
  sectionTitle: LanguageOptions;
  section: string;
  subSections: Array<ApiSubSection>;
}

export interface ApiSubSection {
  document: string;
  title: LanguageOptions;
}

export interface RespApiSection {
  sectionTitle: string;
  subSections: Array<RespApiSubSection>;
}

export interface RespApiSubSection {
  title: string;
  route: string;
}

export interface IApiDoc extends Document {
  sectionTitle: LanguageOptions;
  subSections: Array<string>;
  titleToShow: string;
}

export interface IApiDocPopulated extends Omit<IApiDoc, "subSections"> {
  subSections: Array<IApiDocSubSection>;
}
