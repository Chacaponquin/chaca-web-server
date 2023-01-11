import { FILE_TYPE } from "@shared/constants/enums/FILE_TYPE.enum";
import { ArgumentSchema } from "@shared/interfaces/argument.interface";

export interface InputConfigSchema {
  file: InputFileTypeConfig;
  saveSchema: boolean;
}

export interface InputFileTypeConfig {
  fileType: FILE_TYPE;
  arguments: { [path: string]: unknown };
}

export interface FileOption {
  fileType: FILE_TYPE;
  arguments: ArgumentSchema[];
}
