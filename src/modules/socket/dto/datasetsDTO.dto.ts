import {
  ConfigIsArray,
  ConfigPosibleNull,
} from "@modules/api/dto/fieldConfig.dto";
import { FieldDataType } from "../modules/dataset_generator/interfaces/dataType.interface";

export interface InputDataset {
  name: string;
  id: string;
  limit: number;
  fields: InputDatasetField[];
}

export interface InputDatasetField<T = FieldDataType> {
  name: string;
  id: string;
  dataType: T;
  isPosibleNull: ConfigPosibleNull;
  isArray: ConfigIsArray;
}
