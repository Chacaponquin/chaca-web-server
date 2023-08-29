import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Call Duration",
  args: [
    {
      argument: "min",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "max",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],

  schemaField: (a) => schemas.phone.callDuration(a),
});
