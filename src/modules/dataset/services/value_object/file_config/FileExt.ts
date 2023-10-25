import { FILE_TYPE } from "@modules/dataset/constants/FILE_TYPE";
import { IncorrectFileExportFormatException } from "@modules/dataset/exceptions";
import { ExportFormat } from "chaca";

export class FileExt {
  private _type: FILE_TYPE;

  constructor(type: FILE_TYPE) {
    this._type = type;
  }

  public get value(): ExportFormat {
    switch (this._type) {
      case FILE_TYPE.CSV:
        return "csv";
      case FILE_TYPE.JAVA:
        return "java";
      case FILE_TYPE.JAVASCRIPT:
        return "javascript";
      case FILE_TYPE.JSON:
        return "json";
      case FILE_TYPE.TYPESCRIPT:
        return "typescript";
      case FILE_TYPE.YAML:
        return "yaml";
      default:
        throw new IncorrectFileExportFormatException(
          `${this._type} is not a valid export format`,
        );
    }
  }
}
