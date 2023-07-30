import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

export class GetValueBySchemaOption {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(
    schema: string,
    option: string,
    optionParams: Record<string, unknown>,
  ): unknown | Array<unknown> {
    const foundOption = this.schemaOptionsServices.findSchemaOption(
      schema,
      option,
    );

    const returnValue = this.schemaOptionsServices.generateValueByParams(
      foundOption,
      optionParams,
    );

    return returnValue;
  }
}
