import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Hsl",
  schemaField: (a) => schemas.color.hsl(a),
  args: [
    {
      argument: "format",
      inputType: ARGUMENT_TYPE.SELECT,
      selectValues: ["binary", "css"],
    },
    { argument: "includeAlpha", inputType: ARGUMENT_TYPE.BOOLEAN },
  ],
});
