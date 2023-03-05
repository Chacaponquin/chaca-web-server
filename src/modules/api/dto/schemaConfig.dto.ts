import { ApiFieldConfig } from "./fieldConfig.dto";

export type SchemaConfigDTO =
  | ApiSchemaConfigSimpleObject
  | ApiSchemaConfigCompleteObject;

export type ApiSchemaConfigSimpleObject = { [key: string]: ApiFieldConfig };

export type ApiSchemaConfigCompleteObject = {
  schema: ApiSchemaConfigSimpleObject;
  limit?: number;
};
