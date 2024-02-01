import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

type Props = {
  schema: string;
  option: string;
  optionConfig?: Record<string, unknown>;
};

export class GetValueBySchemaOption {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute({
    option,
    schema,
    optionConfig = {},
  }: Props): unknown | Array<unknown> {
    const foundOption = this.schemaOptionsServices.findSchemaOption(
      schema,
      option,
    );

    const returnValue = this.schemaOptionsServices.generateValueByParams(
      foundOption,
      optionConfig,
    );

    return returnValue;
  }
}
