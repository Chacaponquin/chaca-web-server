import { chaca } from "chaca";
import { SchemaOption } from "../interfaces/options";

interface SchemaProps {
  name: string;
  options: Array<SchemaOption>;
}

export class Schema {
  private _name: string;
  private _options: Array<SchemaOption>;
  private _showName: string;

  constructor({ name, options }: SchemaProps) {
    this._name = name;
    this._options = options;
    this._showName = chaca.utils.camelCase(this._name);
  }

  public get name() {
    return this._name;
  }

  public get options() {
    return this._options;
  }

  public get showName() {
    return this._showName;
  }
}
