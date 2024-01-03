import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Text",
  schemaField: (a) => schemas.lorem.text(a),
  args: [
    {
      argument: "character_max",

      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "character_min",

      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
