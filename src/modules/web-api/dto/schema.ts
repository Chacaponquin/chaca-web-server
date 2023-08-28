import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";

export interface ApiSchema {
  name: string;
  options: Array<ApiSchemaOption>;
}

export interface ApiSchemaOption {
  name: string;
  arguments: Array<ApiArgument>;
}

export interface ApiArgument {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: Array<string>;
}
