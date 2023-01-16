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
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.TEXT,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    name: "Time Zone",
    exampleValue: schemas.address.timeZone().getValue(),
    getValue: (a) => schemas.address.timeZone().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Cardinal Direction",
    exampleValue: schemas.address.cardinalDirection().getValue(),
    getValue: (a) => schemas.address.cardinalDirection().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Country",
    exampleValue: schemas.address.country().getValue(),
    getValue: (a) => schemas.address.country().getValue(a),
    arguments: [
      {
        argument: "continent",
        description: { en: "", es: "" },
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
    description: { en: "", es: "" },
  },
  {
    name: "Country Code",
    exampleValue: schemas.address.countryCode().getValue(),
    getValue: (a) => schemas.address.countryCode().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
];
