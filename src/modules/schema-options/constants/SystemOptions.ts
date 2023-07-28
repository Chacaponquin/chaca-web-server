import { schemas } from "chaca";
import { SchemaOption } from "@modules/schema-options/interfaces/options.interface";

export const SystemOptions: SchemaOption[] = [
  {
    schemaField:  () =>schemas.system.fileExt(),
    name: "File Extension",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve el nombre de una extensión de archivo",
    },
  },
  {
    schemaField:  () =>schemas.system.fileName(),
    name: "File Name",
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un archivo" },
  },
  {
    schemaField:  () =>schemas.system.filePath(),
    name: "File Path",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la dirección de unn archivo en el sistema",
    },
  },
  {
    schemaField:  () =>schemas.system.directoryPath(),
    name: "Directory Path",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la dirección en el sistema de una carpeta",
    },
  },
  {
    schemaField:  () => schemas.system.filePath(),
    name: "File Path",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la dirección de unn archivo en el sistema",
    },
  },
  {
    schemaField:  () =>schemas.system.mimeType(),
    name: "Mime Type",
    arguments: [],
    description: {
      en: "",
      es: "Devuelve la clasificación de un tipo de archivo",
    },
  },
];
