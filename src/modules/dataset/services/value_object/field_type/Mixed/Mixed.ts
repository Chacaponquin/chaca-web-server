import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { Schema } from "../../schemas";

export class MixedValueField implements ISchemaField {
  private schema: Schema;

  constructor(schema: Schema) {
    this.schema = schema;
  }

  public getField() {
    return this.schema;
  }
}
