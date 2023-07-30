import { SchemaOption } from "@modules/schema-options/interfaces/options";
import { schemas } from "chaca";

export const IdOptions: SchemaOption[] = [
  {
    name: "MongoDB ID",
    schemaField: () => schemas.id.mongodbID(),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "UUID",
    schemaField: () => schemas.id.uuid(),
    arguments: [],
    description: { en: "", es: "" },
  },
];
