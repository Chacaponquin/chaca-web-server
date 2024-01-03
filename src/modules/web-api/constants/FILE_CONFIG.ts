import { FILE_TYPE } from "@modules/dataset/constants/FILE_TYPE";
import { FileOption } from "../interfaces/config";

export const FILE_CONFIG: FileOption[] = [
  {
    fileType: FILE_TYPE.JSON,
    arguments: [],
    title: "JSON",
  },
  { fileType: FILE_TYPE.CSV, arguments: [], title: "CSV" },
  {
    fileType: FILE_TYPE.JAVASCRIPT,
    arguments: [],
    title: "Javascript",
  },
  {
    fileType: FILE_TYPE.TYPESCRIPT,
    arguments: [],
    title: "Typescript",
  },
  { fileType: FILE_TYPE.JAVA, arguments: [], title: "Java" },
  { fileType: FILE_TYPE.YAML, arguments: [], title: "Yaml" },
  { fileType: FILE_TYPE.POSTGRESQL, arguments: [], title: "Postgresql" },
  { arguments: [], fileType: FILE_TYPE.PYTHON, title: "Python" },
];
