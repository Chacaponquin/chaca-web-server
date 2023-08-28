import { OptionArgument } from "../../dataset/dto/argument";
import { LanguageOptions } from "@modules/app/modules/language/interfaces/language";
import { SchemaField } from "chaca";

export interface SchemaOption {
  name: string;
  arguments: Array<OptionArgument>;
  description: LanguageOptions;
  schemaField: (a?: any) => SchemaField;
}
