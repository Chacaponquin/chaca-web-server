import { SchemaOption } from "../interfaces/options";

interface SchemaProps {
  name: string;
  options: Array<SchemaOption>;
}

export class Schema {
  private _name: string;
  private _options: Array<SchemaOption>;

  constructor({ name, options }: SchemaProps) {
    this._name = name;
    this._options = options;
  }

  public get name() {
    return this._name;
  }

  public get options() {
    return this._options;
  }
}
