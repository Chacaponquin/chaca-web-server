export type SchemaConfigDTO =
  | ApiSchemaConfigObject
  | ApiSchemaConfigCompleteObject;

export type ApiSchemaConfigObject = {
  [key: string]: string | ApiSchemaConfigObject;
};

export type ApiSchemaConfigCompleteObject = {
  schema: ApiSchemaConfigObject;
  limit?: number;
};
