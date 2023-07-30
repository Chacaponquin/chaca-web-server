import { FILE_TYPE } from "@modules/dataset/constants/FILE_TYPE";
import { OptionArgument } from "@modules/dataset/dto/argument";

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
  arguments: OptionArgument[];
}
