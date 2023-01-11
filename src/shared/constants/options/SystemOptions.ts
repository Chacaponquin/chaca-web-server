import { schemas } from "chaca";
import { OptionSchema } from "../../interfaces/options.interface";

export const SystemOptions: OptionSchema[] = [
  {
    exampleValue: schemas.system.fileExt(),
    getValue: (a) => schemas.system.fileExt().getValue(a),
    name: "File Extension",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.fileName().getValue(),
    getValue: (a) => schemas.system.fileName().getValue(a),
    name: "File Name",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.filePath().getValue(),
    getValue: (a) => schemas.system.filePath().getValue(a),
    name: "File Path",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.directoryPath().getValue(),
    getValue: (a) => schemas.system.directoryPath().getValue(a),
    name: "Directory Path",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.filePath().getValue(),
    getValue: (a) => schemas.system.filePath().getValue(a),
    name: "File Path",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.mimeType().getValue(),
    getValue: (a) => schemas.system.mimeType().getValue(a),
    name: "Mime Type",
    arguments: [],
    description: { en: "", es: "" },
  },
];
