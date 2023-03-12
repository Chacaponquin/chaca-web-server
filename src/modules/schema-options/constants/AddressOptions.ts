import { SubOption } from "../interfaces/options.interface";
import { schemas } from "chaca";
import { ARGUMENT_TYPE } from "../../../shared/constants/ARGUMENT_TYPE.enum";

export const AddressOptions: SubOption[] = [
  {
    name: "Zip Code",
    getValue: (a) => schemas.address.zipCode().getValue(a),
    exampleValue: schemas.address.zipCode().getValue(),
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
    exampleValue: schemas.address.timeZone().getValue(),
    getValue: (a) => schemas.address.timeZone().getValue(a),
    arguments: [],
    description: {
      en: "",
      es: "Devuelve una zona horaria de una región geográfica",
    },
  },
  {
    name: "Cardinal Direction",
    exampleValue: schemas.address.cardinalDirection().getValue(),
    getValue: (a) => schemas.address.cardinalDirection().getValue(a),
    arguments: [],
    description: { en: "", es: "Devuelve una dirección cardinal" },
  },
  {
    name: "Country",
    exampleValue: schemas.address.country().getValue(),
    getValue: (a) => schemas.address.country().getValue(a),
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
    exampleValue: schemas.address.countryCode().getValue(),
    getValue: (a) => schemas.address.countryCode().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
];
