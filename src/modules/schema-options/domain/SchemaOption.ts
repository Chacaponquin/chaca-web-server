import { OptionArgument } from "@modules/schema-options/interfaces/argument";
import { SchemaField, chaca } from "chaca";

type SchemaFieldFunction = (a?: any) => SchemaField;

interface Props {
  name: string;
  args?: Array<OptionArgument>;
  schemaField: SchemaFieldFunction;
}

export class SchemaOption {
  private _name: string;
  private _arguments: Array<OptionArgument>;
  private _schemaField: SchemaFieldFunction;

  constructor({ args, name, schemaField }: Props) {
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

  private _stringToCompare(name: string): string {
    return chaca.utils.camelCase(name).trim().toLowerCase();
  }

  public equal(name: string) {
    return this._stringToCompare(this.name) === this._stringToCompare(name);
  }
}
