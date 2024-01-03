import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Job Area",
  schemaField: () => schemas.person.jobArea(),
});
