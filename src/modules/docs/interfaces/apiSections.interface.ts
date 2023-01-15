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
