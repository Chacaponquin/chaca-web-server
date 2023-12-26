import { IncorrectFieldTypeException } from "@modules/api/exceptions";
import { DefinedValueType } from "@modules/dataset/dto/data_type";
import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import {
  NotFoundOptionError,
  NotFoundSchemaError,
} from "@modules/schema-options/exceptions";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { SchemaField } from "chaca";

export class DefinedValueField implements ISchemaField {
  private _schemaField: SchemaField;

  constructor(
    private readonly schemaOptionsServices: SchemaOptionsService,
    definedValue: DefinedValueType,
  ) {
    try {
      const foundOption = this.schemaOptionsServices.findSchemaOption(
        definedValue.schema,
        definedValue.option,
      );

      this._schemaField = foundOption.schemaField(definedValue.args || {});
    } catch (error) {
      if (error instanceof NotFoundSchemaError) {
        throw new IncorrectFieldTypeException(error.message);
      } else if (error instanceof NotFoundOptionError) {
        throw new IncorrectFieldTypeException(error.message);
      } else {
        throw new IncorrectFieldTypeException(error.message);
      }
    }
  }

  public getField() {
    return this._schemaField;
  }
}
