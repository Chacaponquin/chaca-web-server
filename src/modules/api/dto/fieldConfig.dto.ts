export type ConfigIsArray = null | {
  min: number;
  max: number;
};

export type ConfigPosibleNull = number;

export type ApiSimpleConfigFieldSchema = string;

export type ApiCompleteConfigFieldSchema = {
  schema: ApiSimpleConfigFieldSchema | ApiFieldConfig;
  isArray?: ConfigIsArray;
  posibleNull?: ConfigPosibleNull;
};

export type ApiFieldConfig =
  | ApiSimpleConfigFieldSchema
  | ApiCompleteConfigFieldSchema;
