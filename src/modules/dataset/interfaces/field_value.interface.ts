import {
  CustomField,
  EnumField,
  KeyField,
  RefField,
  SchemaField,
  SequenceField,
  SequentialField,
} from "chaca";
import { Schema } from "../services/value_object/schemas";

export interface ISchemaField {
  getField():
    | SchemaField
    | Schema
    | RefField
    | CustomField
    | SequenceField
    | SequentialField
    | EnumField
    | KeyField;
}
