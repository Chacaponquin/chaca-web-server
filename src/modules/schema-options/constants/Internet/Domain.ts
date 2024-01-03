import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: () => schemas.internet.domainName(),
  name: "Domain Name",
});
