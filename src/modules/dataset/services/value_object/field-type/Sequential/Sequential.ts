import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { SequentialField, chaca } from "chaca";
import { ArrayValues } from "./value-object";

interface Props {
  values?: Array<unknown>;
  loop?: boolean;
}

export class SequentialValueField implements ISchemaField {
  private _values: Array<unknown> = [];
  private _loop = false;

  constructor({ values, loop }: Props) {
    this._values = new ArrayValues(values).values();

    if (loop) {
      this._loop = loop;
    }
  }

  get values() {
    return this._values;
  }

  get loop() {
    return this._loop;
  }

  getField(): SequentialField {
    return chaca.sequential(this._values, { loop: this.loop });
  }
}
