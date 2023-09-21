import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { DATA_TYPES } from "../constants/DATA_TYPE";

export type FieldDataType =
  | CustomDataType
  | MixedDataType
  | DefinedValueDataType
  | RefDataType
  | SequenceDataType
  | SequentialDataType
  | EnumDataType;

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
  args?: Record<string, unknown>;
};

export type SequenceDataType = {
  type: DATA_TYPES.SEQUENCE;
  startsWith?: number;
  step?: number;
};

export type SequentialDataType = {
  type: DATA_TYPES.SEQUENTIAL;
  values: Array<unknown>;
};

export type EnumDataType = {
  type: DATA_TYPES.ENUM;
  values: Array<unknown>;
};
