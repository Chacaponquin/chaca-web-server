import { ConfigIsArray, ConfigPosibleNull } from "./fieldConfig.dto";

export type SchemaConfigDTO =
  | ApiSchemaConfigObject
  | ApiSchemaConfigCompleteObject;

export type ApiSchemaConfigObject = {
  [key: string]: string | ApiSchemaField;
};

export type ApiSchemaField = {
  schema: string | ApiSchemaConfigObject;
  isArray?: ConfigIsArray;
  isPosibleNull?: ConfigPosibleNull;
};

export type ApiSchemaConfigCompleteObject = {
  schema: ApiSchemaConfigObject;
  limit?: number;
};
