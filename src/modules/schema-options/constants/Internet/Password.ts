import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.internet.password(a),
  name: "Password",
  args: [
    {
      argument: "len",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "memorable",
      inputType: ARGUMENT_TYPE.BOOLEAN,
    },
    {
      argument: "prefix",

      inputType: ARGUMENT_TYPE.TEXT,
    },
  ],
});
