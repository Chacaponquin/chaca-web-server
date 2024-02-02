import { ConfigIsArray, ConfigPosibleNull } from "../../dataset/dto/field";

export type SimpleSchemaConfig = Record<string, string | SchemaFieldConfig>;

export type SchemaFieldConfig = {
  type?: string;
  params?: SchemaFieldParams;
  isArray?: ConfigIsArray;
  posibleNull?: ConfigPosibleNull;
};

export type SchemaFieldParams = Record<string, any>;

export type CompleteSchemaConfig = {
  schema?: SimpleSchemaConfig;
  count?: number;
};
