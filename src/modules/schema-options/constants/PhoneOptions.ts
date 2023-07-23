import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";
import { SchemaOption } from "@modules/schema-options/interfaces/options.interface";

export const PhoneOptions: SchemaOption[] = [
  {
    name: "Number",
    schemaField: schemas.phone.number(),
    arguments: [
      {
        inputType: ARGUMENT_TYPE.TEXT,
        argument: "format",
        description: {
          en: "",
          es: "Formato del número telefónico. Se debe indicar con # donde quiere que haya un número. Ejemplo: +53 #### ###",
        },
      },
    ],
    description: { en: "", es: "Devuelve un número telefónico" },
  },
  {
    name: "Prefix",
    schemaField: schemas.phone.prefix(),
    arguments: [],
    description: { en: "", es: "Devuelve un prefijo de un número telefónico" },
  },
  {
    name: "Call Duration",
    arguments: [
      {
        argument: "min",
        description: {
          en: "",
          es: "Mínima cantidad de minutos que debe tener la llamada",
        },
        inputType: ARGUMENT_TYPE.NUMBER,
      },
      {
        argument: "max",
        description: {
          en: "",
          es: "Máxima cantidad de minutos que debe tener la llamada",
        },
        inputType: ARGUMENT_TYPE.NUMBER,
      },
    ],
    description: {
      en: "",
      es: "Devuelve la duración de una llamada telefónica",
    },
    schemaField: schemas.phone.callDuration(),
  },
];
