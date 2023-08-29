import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Words",
  schemaField: (a) => schemas.lorem.words(a),
  args: [
    {
      argument: "count",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
