import { ArgumentSchema } from "./argument.interface";
import { ApiDescription } from "./description.interface";

export interface ApiOption {
  parent: string;
  options: OptionWithRoute[];
}

export interface OptionWithRoute extends OptionSchema {
  route: string;
}

export interface OptionSchema<Z = unknown, T = any> {
  name: string;
  arguments: ArgumentSchema[];
  exampleValue: Z;
  description: ApiDescription;
  getValue: (args: T) => Z;
}
