import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { EnumField, chaca } from "chaca";
import { ArrayValues } from "./value-object";

export class EnumValueField implements ISchemaField {
  private _values: Array<unknown> = [];

  constructor(values?: Array<unknown>) {
    this._values = new ArrayValues(values).values();
  }

  get values() {
    return this._values;
  }

  getField(): EnumField {
    return chaca.enum(this._values);
  }
}
