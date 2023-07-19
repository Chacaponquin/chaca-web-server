import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { schemas } from "chaca";

export const IdOptions: SubOption[] = [
  {
    name: "MongoDB ID",
    schemaField: schemas.id.mongodbID(),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Number Row",
    schemaField: schemas.id.numberRow(),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "UUID",
    schemaField: schemas.id.uuid(),
    arguments: [],
    description: { en: "", es: "" },
  },
];
