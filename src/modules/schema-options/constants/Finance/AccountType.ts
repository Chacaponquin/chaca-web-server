import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: () => schemas.finance.accountType(),
  name: "Account Type",
});
