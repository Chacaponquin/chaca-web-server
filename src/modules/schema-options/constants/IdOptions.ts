import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { schemas } from "chaca";

export const IdOptions: SubOption[] = [
  {
    name: "MongoDB ID",
    exampleValue: schemas.id.mongodbID().getValue(),
    getValue: (a) => schemas.id.mongodbID().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Number Row",
    exampleValue: schemas.id.numberRow().getValue(),
    getValue: (a) => schemas.id.numberRow().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "UUID",
    exampleValue: schemas.id.uuid().getValue(),
    getValue: (a) => schemas.id.uuid().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
];
