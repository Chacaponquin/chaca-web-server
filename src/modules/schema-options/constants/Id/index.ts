import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export const IdOptions: SchemaOption[] = [
  new SchemaOption({
    name: "Mongodb ID",
    schemaField: () => schemas.id.mongodbID(),
  }),
  new SchemaOption({
    name: "UUID",
    schemaField: () => schemas.id.uuid(),
  }),
];
