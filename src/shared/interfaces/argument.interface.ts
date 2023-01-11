import { ARGUMENT_TYPE } from "@shared/constants/enums/ARGUMENT_TYPE.enum";
import { ApiDescription } from "./description.interface";

export type ArgumentSchema = {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: string[];
  description: ApiDescription;
};
