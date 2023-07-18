import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";

export const SystemOptions: SubOption[] = [
  {
    exampleValue: schemas.system.fileExt(),
    getValue: (a) => schemas.system.fileExt().getValue(a),
    name: "File Extension",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve el nombre de una extensión de archivo",
    },
  },
  {
    exampleValue: schemas.system.fileName().getValue(),
    getValue: (a) => schemas.system.fileName().getValue(a),
    name: "File Name",
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un archivo" },
  },
  {
    exampleValue: schemas.system.filePath().getValue(),
    getValue: (a) => schemas.system.filePath().getValue(a),
    name: "File Path",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la dirección de unn archivo en el sistema",
    },
  },
  {
    exampleValue: schemas.system.directoryPath().getValue(),
    getValue: (a) => schemas.system.directoryPath().getValue(a),
    name: "Directory Path",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la dirección en el sistema de una carpeta",
    },
  },
  {
    exampleValue: schemas.system.filePath().getValue(),
    getValue: (a) => schemas.system.filePath().getValue(a),
    name: "File Path",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la dirección de unn archivo en el sistema",
    },
  },
  {
    exampleValue: schemas.system.mimeType().getValue(),
    getValue: (a) => schemas.system.mimeType().getValue(a),
    name: "Mime Type",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la clasificación de un tipo de archivo",
    },
  },
];
