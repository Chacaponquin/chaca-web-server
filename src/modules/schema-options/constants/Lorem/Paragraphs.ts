import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Paragraphs",
  schemaField: (a) => schemas.lorem.paragraphs(a),
  args: [
    {
      argument: "paragraphsCount",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "separator",
      inputType: ARGUMENT_TYPE.TEXT,
    },
    {
      argument: "maxSentences",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "minSentences",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
