import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

export class GetValueBySchemaOption {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(
    schema: string,
    option: string,
    optionConfig: Record<string, string>,
  ): unknown | Array<unknown> {
    const foundOption = this.schemaOptionsServices.findSchemaOption(
      schema,
      option,
    );

    const returnValue = this.schemaOptionsServices.generateValueByConfig(
      foundOption,
      this.generateOptionConfig(optionConfig),
    );

    return returnValue;
  }

  private generateOptionConfig(
    config: Record<string, string>,
  ): Record<string, unknown> {
    let retObject = {};

    for (const [key, value] of Object.entries(config)) {
      const configValue = this.validateStringValue(value);
      retObject = { ...retObject, [key]: configValue };
    }

    return retObject;
  }

  private validateStringValue(value: string): unknown {
    let returnValue: unknown = value;

    if (value === "true") {
      returnValue = true;
    } else if (value === "false") {
      returnValue = false;
    } else if (
      typeof Number(value) === "number" &&
      !Number.isNaN(Number(value))
    ) {
      returnValue = Number(value);
    }

    return returnValue;
  }
}
