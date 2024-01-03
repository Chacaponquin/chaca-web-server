import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { chaca } from "chaca";
import { FieldName } from "../../field-config";

export class RefValueField implements ISchemaField {
  private refField: string;

  constructor(refField: string) {
    this.refField = refField
      .split(".")
      .map((r) => new FieldName(r).value)
      .join(".");
  }

  getField() {
    return chaca.ref(this.refField);
  }
}
