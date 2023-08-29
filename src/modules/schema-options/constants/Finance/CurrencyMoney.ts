import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Currency Money Name",
  schemaField: () => schemas.finance.currencyMoneyName(),
});
