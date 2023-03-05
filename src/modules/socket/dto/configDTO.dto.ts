import { FILE_TYPE } from "@shared/constants/FILE_TYPE.enum";

export interface InputConfig {
  file: InputFileTypeConfig;
  saveSchema: UserSaveModelSchemaConfig;
}

export type UserSaveModelSchemaConfig = null | {
  tags: Array<string>;
  name: string;
  description: string;
};

export interface InputFileTypeConfig {
  fileType: FILE_TYPE;
  arguments: { [path: string]: unknown };
}
