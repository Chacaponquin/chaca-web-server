import { IncorrectFieldTypeException } from "@modules/api/exceptions";
import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { CustomField, schemas } from "chaca";

export class CustomValueField implements ISchemaField {
  private _fun: CustomField;

  public static START_FUNCTION_STRING = "function getValue(props) {";

  constructor(stringFunction: string) {
    if (stringFunction.startsWith(CustomValueField.START_FUNCTION_STRING)) {
      const contentCode: string = stringFunction
        .trim()
        .slice(
          CustomValueField.START_FUNCTION_STRING.length + 1,
          stringFunction.lastIndexOf("}"),
        );

      const func = new Function("props", contentCode);

      this._fun = ({ currentFields, store }) => {
        return func({ currentFields, store, schemas });
      };
    } else {
      throw new IncorrectFieldTypeException(
        "Incorrect pattern of custom field",
      );
    }
  }

  getField() {
    return this._fun;
  }
}
