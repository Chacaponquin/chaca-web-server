import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { EnumField, chaca } from "chaca";

export class EnumValueField implements ISchemaField {
  private _values: Array<unknown> = [];

  constructor(values: Array<unknown>) {
    this._values = values;
  }

  getField(): EnumField {
    return chaca.enum(this._values);
  }
}
