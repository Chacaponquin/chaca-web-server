import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { chaca } from "chaca";

export class RefValueField implements ISchemaField {
  private refField: string;

  constructor(refField: Array<string>) {
    this.refField = refField.join(".");
  }

  getField() {
    return chaca.ref(this.refField);
  }
}
