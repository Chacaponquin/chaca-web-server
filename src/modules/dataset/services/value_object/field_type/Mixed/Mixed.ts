import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { ChacaSchema } from "chaca";

export class MixedValueField implements ISchemaField {
  private schema: ChacaSchema;

  constructor(schema: ChacaSchema) {
    this.schema = schema;
  }

  public getField() {
    return this.schema;
  }
}
