import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Rgb",
  schemaField: (a) => schemas.color.cmyk(a),
  args: [
    {
      argument: "format",
      inputType: ARGUMENT_TYPE.SELECT,
      selectValues: ["binary", "css"],
    },
    {
      argument: "casing",
      inputType: ARGUMENT_TYPE.SELECT,
      selectValues: ["lower", "mixed", "upper"],
    },
    { argument: "includeAlpha", inputType: ARGUMENT_TYPE.BOOLEAN },
    { argument: "prefix", inputType: ARGUMENT_TYPE.TEXT },
  ],
});
