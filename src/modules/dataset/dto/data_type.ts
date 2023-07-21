import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { DATA_TYPES } from "../constants/DATA_TYPE.enum";

export type FieldDataType =
  | CustomDataType
  | MixedDataType
  | DefinedValueDataType
  | RefDataType;

export type RefDataType = {
  type: DATA_TYPES.REF;
  ref: Array<string>;
};

export type DefinedValueDataType = {
  type: DATA_TYPES.SINGLE_VALUE;
  fieldType: DefinedValueType;
};

export type MixedDataType = {
  type: DATA_TYPES.MIXED;
  object: Array<InputDatasetFieldDTO<FieldDataType>>;
};

export type CustomDataType = {
  type: DATA_TYPES.CUSTOM;
  code: string;
};

export type DefinedValueType = {
  parent: string;
  type: string;
  args: Record<string, unknown>;
};
