import { IncorrectFieldTypeException } from "@modules/api/exceptions";

export class SchemaOption {
  private _schema: string;
  private _option: string;

  constructor(optionString: string) {
    const [schema, option] = this.validate(optionString);

    this._schema = schema;
    this._option = option;
  }

  public get schema() {
    return this._schema;
  }

  public get option() {
    return this._option;
  }

  private validate(optionString: string): [string, string] {
    const pattern = /^[\w]+[.][\w]+$/;

    if (pattern.test(optionString)) {
      const [schema, option] = optionString.split(".");

      return [schema, option];
    } else {
      throw new IncorrectFieldTypeException(
        `The field type must have the pattern 'schema.option'. Example: 'id.uuid'`,
      );
    }
  }
}
