import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { LanguageOptions } from "@modules/app/modules/language/interfaces/language";

export type OptionArgument = {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: Array<string>;
  description: LanguageOptions;
};
