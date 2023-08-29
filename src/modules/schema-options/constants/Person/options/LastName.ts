import { SchemaOption } from "@modules/schema-options/domain";
import { LANGUAGE_ARGUMENTS } from "../constants";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Last Name",
  args: LANGUAGE_ARGUMENTS,
  schemaField: (a) => schemas.person.lastName(a),
});
