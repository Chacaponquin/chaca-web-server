import { SchemaOption } from "@modules/schema-options/domain";
import DirectoryPath from "./DirectoryPath";
import FileExtension from "./FileExtension";
import FileName from "./FileName";
import FilePath from "./FilePath";
import MimeType from "./MimeType";

export const SystemOptions: SchemaOption[] = [
  DirectoryPath,
  FileExtension,
  FileName,
  FilePath,
  MimeType,
];
