import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.date.between(a),
  name: "Between",
  args: [
    {
      argument: "from",
      inputType: ARGUMENT_TYPE.DATE,
    },
    {
      argument: "to",
      inputType: ARGUMENT_TYPE.DATE,
    },
  ],
});
