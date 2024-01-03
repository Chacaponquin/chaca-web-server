import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.dataType.float(a),
  name: "Float",
  args: [
    {
      argument: "min",
      inputType: ARGUMENT_TYPE.FLOAT,
    },
    {
      argument: "max",
      inputType: ARGUMENT_TYPE.FLOAT,
    },
    {
      argument: "precision",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
