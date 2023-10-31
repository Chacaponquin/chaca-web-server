import { MultiGenerateSchema, chaca } from "chaca";
import { Generator } from "./Generator";

export class MultiSchema extends Generator {
  constructor(private readonly multiSchemas: Array<MultiGenerateSchema>) {
    super();
  }

  public generate() {
    const func = () =>
      chaca.multiGenerate(this.multiSchemas, { verbose: false });
    return this.gen(func);
  }
}
