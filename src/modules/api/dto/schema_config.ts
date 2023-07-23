import { ConfigIsArray, ConfigPosibleNull } from "../../dataset/dto/field";

export type SimpleSchemaConfig = Record<string, string | SchemaFieldConfig>;

export type SchemaFieldConfig = {
  fieldType?: SchemaFieldType;
  isArray?: ConfigIsArray;
  isPosibleNull?: ConfigPosibleNull;
};

export type SchemaFieldType =
  | string
  | { type?: string; params?: Record<string, unknown> };

export type CompleteSchemaConfig = {
  schema?: SimpleSchemaConfig;
  limit?: number;
};
