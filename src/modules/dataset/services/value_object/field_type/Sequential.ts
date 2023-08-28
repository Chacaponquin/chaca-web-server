import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { SequentialField, chaca } from "chaca";

export class SequentialValueField implements ISchemaField {
  private _values: Array<unknown> = [];

  constructor(values: Array<unknown>) {}

  getField(): SequentialField {
    return chaca.sequential();
  }
}
