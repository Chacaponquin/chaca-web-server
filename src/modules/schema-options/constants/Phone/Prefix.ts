import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Prefix",
  schemaField: () => schemas.phone.prefix(),
});
