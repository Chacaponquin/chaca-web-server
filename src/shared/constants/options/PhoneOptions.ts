import { schemas } from "chaca";
import { OptionSchema } from "../../interfaces/options.interface";

export const PhoneOptions: OptionSchema[] = [
  {
    name: "Number",
    getValue: (a) => schemas.phone.number().getValue(a),
    exampleValue: schemas.phone.number().getValue(),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Prefix",
    exampleValue: schemas.phone.prefix().getValue(),
    getValue: (a) => schemas.phone.prefix().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    arguments: [],
    description: { en: "", es: "" },
    exampleValue: schemas.phone.callDuration(),
    name: "Call Duration",
    getValue: (a) => schemas.phone.callDuration().getValue(a),
  },
];
