import { ArgumentSchema } from "../../../shared/interfaces/argument.interface";
import { LanguageOptions } from "../../../shared/interfaces/language.interface";

export interface ApiSchema {
  parent: string;
  options: Array<SubOption>;
}

export interface SubOption<Z = unknown, T = any> {
  name: string;
  arguments: ArgumentSchema[];
  exampleValue: Z;
  description: LanguageOptions;
  getValue: (args: T) => Z;
}

export interface RespApiSchema extends Omit<ApiSchema, "options"> {
  id: string;
  options: Array<RespSubOption>;
}

export interface RespSubOption extends Omit<SubOption, "description"> {
  route: string;
  description: string;
  id: string;
}
