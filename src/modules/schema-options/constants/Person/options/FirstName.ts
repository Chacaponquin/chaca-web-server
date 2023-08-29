import { SchemaOption } from "@modules/schema-options/domain";
import { NAME_FIELD_ARGUMENTS } from "../constants";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "First Name",
  args: NAME_FIELD_ARGUMENTS,
  schemaField: (a) => schemas.person.firstName(a),
});
