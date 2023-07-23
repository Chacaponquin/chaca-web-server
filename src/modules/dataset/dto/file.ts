import { FILE_TYPE } from "../constants/FILE_TYPE";

export interface FileConfigDTO {
  fileType: FILE_TYPE;
  arguments: Record<string, unknown>;
}
