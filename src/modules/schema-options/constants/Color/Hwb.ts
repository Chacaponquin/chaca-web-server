import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Hwb",
  schemaField: (a) => schemas.color.cmyk(a),
  args: [
    {
      argument: "format",
      inputType: ARGUMENT_TYPE.SELECT,
      selectValues: ["binary", "css"],
    },
  ],
});
