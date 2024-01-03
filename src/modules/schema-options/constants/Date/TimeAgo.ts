import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  schemaField: (a) => schemas.date.timeAgo(a),
  name: "Time Ago",
  args: [
    {
      argument: "unit",
      inputType: ARGUMENT_TYPE.SELECT,
      selectValues: ["years", "seconds", "minutes", "days", "hours", "months"],
    },
  ],
});
