import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { SequentialField, chaca } from "chaca";
import { ArrayValues } from "./value_object";

export class SequentialValueField implements ISchemaField {
  private _values: Array<unknown> = [];

  private loop = false;

  constructor(values?: Array<unknown>) {
    this._values = new ArrayValues(values).values();
  }

  getField(): SequentialField {
    return chaca.sequential(this._values, { loop: this.loop });
  }
}
