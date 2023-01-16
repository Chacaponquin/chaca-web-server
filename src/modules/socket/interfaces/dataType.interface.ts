import { DATA_TYPES } from "../constants/DATA_TYPE.enum";
import { InputDatasetField } from "../dto/datasetsDTO.dto";

export type FieldDataType =
  | CustomDataType
  | MixedDataType
  | SingleValueDataType
  | RefDataType;

export type RefDataType = {
  type: DATA_TYPES.REF;
  ref: string[];
};

export type SingleValueDataType = {
  type: DATA_TYPES.SINGLE_VALUE;
  fieldType: TypeSchema;
};

export type MixedDataType = {
  type: DATA_TYPES.MIXED;
  object: InputDatasetField<FieldDataType>[];
};

export type CustomDataType = {
  type: DATA_TYPES.CUSTOM;
  code: string;
};

export interface TypeSchema {
  parent: string;
  type: string;
  args: { [key: string]: unknown };
}
