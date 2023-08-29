import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Zip Code",
  schemaField: (a) => schemas.address.zipCode(a),
  args: [
    {
      argument: "format",
      inputType: ARGUMENT_TYPE.TEXT,
    },
  ],
});
