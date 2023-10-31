import { ChacaSchema } from "chaca";
import { Generator } from "./Generator";

export class Schema extends Generator {
  private _schema: ChacaSchema;

  constructor(schema: ChacaSchema) {
    super();
    this._schema = schema;
  }

  public genObject() {
    return this.gen(() => this._schema.generateObject());
  }

  public genArray(count: number) {
    return this.gen(() => this._schema.generate(count));
  }

  get schema() {
    return this._schema;
  }
}
