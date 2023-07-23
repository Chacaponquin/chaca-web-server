import { SchemaOption } from "../interfaces/options.interface";
import { schemas } from "chaca";
import { ARGUMENT_TYPE } from "../../../shared/constants/ARGUMENT_TYPE.enum";

export const AddressOptions: SchemaOption[] = [
  {
    name: "Zip Code",
    schemaField: schemas.address.zipCode(),
    arguments: [
      {
        argument: "format",
        description: {
          en: "",
          es: "Formato del código postal. Escribe un símbolo de número para indicar la cantidad de números que debe tener el código. Ejemplo: #### -> 5261",
        },
        inputType: ARGUMENT_TYPE.TEXT,
      },
    ],
    description: { en: "", es: "Devuelve un código postal" },
  },
  {
    name: "Time Zone",
    schemaField: schemas.address.timeZone(),
    arguments: [],
    description: {
      en: "",
      es: "Devuelve una zona horaria de una región geográfica",
    },
  },
  {
    name: "Cardinal Direction",
    schemaField: schemas.address.cardinalDirection(),
    arguments: [],
    description: { en: "", es: "Devuelve una dirección cardinal" },
  },
  {
    name: "Country",
    schemaField: schemas.address.country(),
    arguments: [
      {
        argument: "continent",
        description: {
          en: "",
          es: "Continente al que pertenece el país a devolver",
        },
        inputType: ARGUMENT_TYPE.SELECT,
        selectValues: [
          "Asia",
          "Africa",
          "Oseania",
          "Europe",
          "South America",
          "North America",
          "Antartica",
        ],
      },
    ],
    description: { en: "", es: "Devuelve el nombre de un país" },
  },
  {
    name: "Country Code",
    schemaField: schemas.address.countryCode(),
    arguments: [],
    description: {
      en: "",
      es: "Devuelve el código del nombre de un país aleatorio",
    },
  },
];
