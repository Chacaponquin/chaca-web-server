import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Number",
  schemaField: (a) => schemas.phone.number(a),
  args: [
    {
      inputType: ARGUMENT_TYPE.TEXT,
      argument: "format",
    },
  ],
});
