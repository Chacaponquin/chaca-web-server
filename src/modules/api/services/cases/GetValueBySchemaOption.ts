import { IncorrectFieldTypeException } from "@modules/api/exceptions";
import {
  NotFoundOptionError,
  NotFoundSchemaError,
} from "@modules/schema-options/exceptions";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

export class GetValueBySchemaOption {
  constructor(private readonly schemaOptionsServices: SchemaOptionsService) {}

  public execute(
    schema: string,
    option: string,
    optionConfig: Record<string, string>,
  ): unknown | Array<unknown> {
    try {
      const foundOption = this.schemaOptionsServices.findSchemaOption(
        schema,
        option,
      );

      const returnValue = this.schemaOptionsServices.generateValueByConfig(
        foundOption,
        this.generateOptionConfig(optionConfig),
      );

      return returnValue;
    } catch (error) {
      if (error instanceof NotFoundSchemaError) {
        throw new IncorrectFieldTypeException(error.message);
      } else if (error instanceof NotFoundOptionError) {
        throw new IncorrectFieldTypeException(error.message);
      } else {
        throw error;
      }
    }
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
