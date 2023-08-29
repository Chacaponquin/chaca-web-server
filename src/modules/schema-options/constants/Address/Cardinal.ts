import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Cardinal Direction",
  schemaField: () => schemas.address.cardinalDirection(),
});
