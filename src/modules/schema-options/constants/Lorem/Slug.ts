import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Slug",
  schemaField: (a) => schemas.lorem.slug(a),
  args: [
    {
      argument: "wordCount",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
  ],
});
