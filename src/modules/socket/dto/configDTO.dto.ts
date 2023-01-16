import { FILE_TYPE } from "@shared/constants/FILE_TYPE.enum";

export interface InputConfig {
  file: InputFileTypeConfig;
  saveSchema: boolean;
}

export interface InputFileTypeConfig {
  fileType: FILE_TYPE;
  arguments: { [path: string]: unknown };
}
