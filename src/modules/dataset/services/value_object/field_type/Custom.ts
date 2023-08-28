import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { CustomField } from "chaca";

export class CustomValueField implements ISchemaField {
  private fun: CustomField;

  constructor(stringFunction: string) {
    const contentCode: string = stringFunction.slice(
      stringFunction.indexOf("{") + 1,
      stringFunction.lastIndexOf("}"),
    );

    const func = new Function("fields", "utils", contentCode);
    this.fun = func as CustomField;
  }

  getField() {
    return this.fun;
  }
}
