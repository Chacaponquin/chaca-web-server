import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Sentences",
  schemaField: (a) => schemas.lorem.sentences(a),
  args: [
    {
      argument: "sentencesCount",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "separator",
      inputType: ARGUMENT_TYPE.TEXT,
    },
    {
      argument: "wordsMin",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "wordsMax",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
