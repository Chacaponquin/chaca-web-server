import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Time Zone",
  schemaField: () => schemas.address.timeZone(),
});
