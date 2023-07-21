import { ArgumentSchema } from "../../../shared/interfaces/argument.interface";
import { LanguageOptions } from "../../../shared/interfaces/language.interface";
import { SchemaField } from "chaca";

export interface Schema {
  name: string;
  options: Array<SchemaOption>;
}

export interface SchemaOption {
  name: string;
  arguments: ArgumentSchema[];
  description: LanguageOptions;
  schemaField: SchemaField;
}

export interface RespApiSchema extends Omit<Schema, "options"> {
  id: string;
  options: Array<RespSubOption>;
}

export interface RespSubOption extends Omit<SchemaOption, "description"> {
  route: string;
  description: string;
  id: string;
}
