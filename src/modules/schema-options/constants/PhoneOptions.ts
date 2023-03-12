import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";

export const PhoneOptions: SubOption[] = [
  {
    name: "Number",
    getValue: (a) => schemas.phone.number().getValue(a),
    exampleValue: schemas.phone.number().getValue(),
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
    exampleValue: schemas.phone.prefix().getValue(),
    getValue: (a) => schemas.phone.prefix().getValue(a),
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
    exampleValue: schemas.phone.callDuration().getValue(),
    getValue: (a) => schemas.phone.callDuration().getValue(a),
  },
];
