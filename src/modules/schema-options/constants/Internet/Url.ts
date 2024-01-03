import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.internet.url(a),
  name: "Url",
  args: [
    {
      argument: "secure",

      inputType: ARGUMENT_TYPE.BOOLEAN,
    },
  ],
});
