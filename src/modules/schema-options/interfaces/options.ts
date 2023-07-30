import { OptionArgument } from "../../dataset/dto/argument";
import { LanguageOptions } from "@modules/app/modules/language/interfaces/language";
import { SchemaField } from "chaca";

export interface Schema {
  name: string;
  options: Array<SchemaOption>;
}

export interface SchemaOption {
  name: string;
  arguments: OptionArgument[];
  description: LanguageOptions;
  schemaField: (a?: any) => SchemaField;
}

export interface RespApiSchema extends Omit<Schema, "options"> {
  id: string;
  options: Array<RespSchemaOption>;
}

export interface RespSchemaOption extends Omit<SchemaOption, "description"> {
  route: string;
  description: string;
  id: string;
}
