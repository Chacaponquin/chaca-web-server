import { DefinedValueType } from "@modules/dataset/dto/data_type";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ChacaSchema, SchemaField, chaca, RefField, CustomField } from "chaca";

export interface ISchemaField {
  getField(): SchemaField | ChacaSchema | RefField | CustomField;
}

export class MixedValueField implements ISchemaField {
  private schema: ChacaSchema;

  constructor(schema: ChacaSchema) {
    this.schema = schema;
  }

  public getField() {
    return this.schema;
  }
}

export class CustomValueField implements ISchemaField {
  private fun: CustomField;

  constructor(stringFunction: string) {
    const contentCode: string = stringFunction.slice(
      stringFunction.indexOf("{") + 1,
      stringFunction.lastIndexOf("}"),
    );

    const func = new Function("fields", "utils", contentCode);
    this.fun = func as CustomField;
  }

  getField() {
    return this.fun;
  }
}

export class RefValueField implements ISchemaField {
  private refField: string;

  constructor(refField: Array<string>) {
    this.refField = refField.join(".");
  }

  getField() {
    return chaca.ref(this.refField);
  }
}

export class DefinedValueField implements ISchemaField {
  public schemaField: SchemaField;
  public args: Record<string, unknown>;

  constructor(
    private readonly schemaOptionsServices: SchemaOptionsService,
    definedValue: DefinedValueType,
  ) {
    const foundOption = this.schemaOptionsServices.findSchemaOption(
      definedValue.parent,
      definedValue.type,
    );

    this.schemaField = foundOption.schemaField;
    this.args = definedValue.args;
  }

  public getField() {
    return this.schemaField;
  }
}
