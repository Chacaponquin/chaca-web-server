import {
  ChacaSchema,
  CustomField,
  EnumField,
  RefField,
  SchemaField,
  SequenceField,
  SequentialField,
} from "chaca";

export interface ISchemaField {
  getField():
    | SchemaField
    | ChacaSchema
    | RefField
    | CustomField
    | SequenceField
    | SequentialField
    | EnumField;
}
