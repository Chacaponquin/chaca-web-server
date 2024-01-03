import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.date.past(a),
  name: "Date Past",
  args: [
    {
      argument: "refDate",
      inputType: ARGUMENT_TYPE.DATE,
    },
    {
      argument: "years",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
