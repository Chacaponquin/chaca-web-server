import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.internet.username(a),
  name: "Username",
  args: [
    {
      argument: "firstName",
      inputType: ARGUMENT_TYPE.TEXT,
    },
    {
      argument: "lastName",
      inputType: ARGUMENT_TYPE.TEXT,
    },
  ],
});
