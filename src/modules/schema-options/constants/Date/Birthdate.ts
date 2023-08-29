import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.date.birthdate(a),
  name: "Birthdate",
  args: [
    {
      argument: "min",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "max",
      inputType: ARGUMENT_TYPE.NUMBER,
    },
    {
      argument: "refDate",
      inputType: ARGUMENT_TYPE.DATE,
    },
    {
      argument: "mode",
      inputType: ARGUMENT_TYPE.SELECT,
      selectValues: ["year", "age"],
    },
  ],
});
