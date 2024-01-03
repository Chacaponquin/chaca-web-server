import { SchemaOption } from "@modules/schema-options/domain";
import { SEX_ARGUMENTS } from "../constants";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Prefix",
  args: SEX_ARGUMENTS,
  schemaField: (a) => schemas.person.prefix(a),
});
