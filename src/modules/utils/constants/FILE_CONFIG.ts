import { FILE_TYPE } from "@shared/constants/enums/FILE_TYPE.enum";
import { FileOption } from "../interfaces/config.interface";

export const FILE_CONFIG: FileOption[] = [
  {
    fileType: FILE_TYPE.JSON,
    arguments: [],
  },
  { fileType: FILE_TYPE.CSV, arguments: [] },
  {
    fileType: FILE_TYPE.JAVASCRIPT,
    arguments: [],
  },
  {
    fileType: FILE_TYPE.TYPESCRIPT,
    arguments: [],
  },
  { fileType: FILE_TYPE.JAVA, arguments: [] },
];
