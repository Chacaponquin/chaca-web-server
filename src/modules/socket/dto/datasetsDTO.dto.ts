import { FieldDataType } from "../interfaces/dataType.interface";

export interface InputDataset {
  name: string;
  id: string;
  limit: number;
  fields: InputDatasetField[];
}

export type InputFieldIsArray = null | {
  min: number;
  max: number;
};

export interface InputDatasetField<T = FieldDataType> {
  name: string;
  id: string;
  dataType: T;
  isPosibleNull: number;
  isArray: InputFieldIsArray;
}
