import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { CustomValueField } from "../Custom/Custom";
import { RefValueField } from "../Ref/Ref";
import { DefinedValueField } from "../SchemaValue/SchemaValue";
import { SequenceValueField } from "../Sequence/Sequence";
import { chaca } from "chaca";

export type AllowKeyField =
  | CustomValueField
  | SequenceValueField
  | DefinedValueField
  | RefValueField;

export class KeyValueField implements ISchemaField {
  private _field: AllowKeyField;

  constructor(field: AllowKeyField) {
    this._field = field;
  }

  public getField() {
    return chaca.key(this._field.getField());
  }
}
