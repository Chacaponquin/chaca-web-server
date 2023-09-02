import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { CustomField, schemas } from "chaca";

export class CustomValueField implements ISchemaField {
  private _fun: CustomField;

  constructor(stringFunction: string) {
    const contentCode: string = stringFunction
      .trim()
      .slice(stringFunction.indexOf("{") + 1, stringFunction.lastIndexOf("}"));

    const func = new Function("props", contentCode);

    this._fun = ({ currentFields, store }) => {
      func({ currentFields, store, schemas });
    };
  }

  getField() {
    return this._fun;
  }
}
