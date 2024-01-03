import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";

export type OptionArgument = {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: Array<string>;
};
