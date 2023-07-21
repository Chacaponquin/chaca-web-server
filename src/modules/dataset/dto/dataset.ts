import { ConfigIsArray, ConfigPosibleNull } from "@modules/dataset/dto/field";
import { FieldDataType } from "@modules/dataset/dto/data_type";

export interface InputDatasetDTO {
  name: string;
  limit: number;
  fields: Array<InputDatasetFieldDTO>;
}

export interface InputDatasetFieldDTO<T = FieldDataType> {
  name: string;
  dataType: T;
  isPosibleNull: ConfigPosibleNull;
  isArray: ConfigIsArray;
}
