import { LanguageOptions } from "@shared/interfaces/language.interface";

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

export interface ApiDocSubSection {
  title: LanguageOptions;
  content: LanguageOptions;
}

export interface IApiDoc {
  sectionTitle: string;
  subSections: Array<ApiDocSubSection>;
}
