import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: () => schemas.finance.creditCard(),
  name: "Credit Card Number",
});
