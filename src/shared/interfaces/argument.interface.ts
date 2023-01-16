import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { LanguageOptions } from "./language.interface";

export type ArgumentSchema = {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: string[];
  description: LanguageOptions;
};
