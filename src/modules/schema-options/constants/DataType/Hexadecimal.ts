import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.dataType.hexadecimal(a),
  name: "Hexadecimal",
  args: [
    {
      argument: "length",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
