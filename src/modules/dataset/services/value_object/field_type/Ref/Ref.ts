import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { chaca } from "chaca";
import { FieldName } from "../../field_config";

export class RefValueField implements ISchemaField {
  private refField: string;

  constructor(refField: Array<string>) {
    this.refField = refField.map((r) => new FieldName(r).value).join(".");
  }

  getField() {
    return chaca.ref(this.refField);
  }
}
