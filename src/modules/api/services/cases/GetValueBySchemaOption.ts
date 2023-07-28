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
    optionParams: Record<string, unknown>,
  ): unknown | Array<unknown> {
    try {
      const foundOption = this.schemaOptionsServices.findSchemaOption(
        schema,
        option,
      );

      const returnValue = this.schemaOptionsServices.generateValueByConfig(
        foundOption,
        optionParams,
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
}
