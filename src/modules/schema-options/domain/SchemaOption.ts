import { OptionArgument } from "@modules/schema-options/interfaces/argument";
import { SchemaField, chaca } from "chaca";

type SchemaFieldFunction = (a?: any) => SchemaField;

interface SchemaOptionProps {
  name: string;
  args?: Array<OptionArgument>;
  schemaField: SchemaFieldFunction;
}

export class SchemaOption {
  private _name: string;
  private _arguments: Array<OptionArgument>;
  private _schemaField: SchemaFieldFunction;

  constructor({ args, name, schemaField }: SchemaOptionProps) {
    this._name = name;
    this._arguments = args ?? [];
    this._schemaField = schemaField;
  }

  get name() {
    return this._name;
  }

  get arguments() {
    return this._arguments;
  }

  get schemaField() {
    return this._schemaField;
  }

  get showName() {
    return chaca.utils.camelCase(this._name);
  }
}
