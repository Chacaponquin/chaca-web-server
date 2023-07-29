export type ConfigIsArray = null | Partial<ConfigIsArrayObject> | number;

export type ConfigIsArrayObject = {
  min: number;
  max: number;
};

export type ConfigPosibleNull = number;
