import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export default new SchemaOption({
  name: "Country",
  schemaField: (a) => schemas.address.country(a),
  args: [
    {
      argument: "continent",
      inputType: ARGUMENT_TYPE.SELECT,
      selectValues: [
        "Asia",
        "Africa",
        "Oseania",
        "Europe",
        "South America",
        "North America",
        "Antartica",
      ],
    },
  ],
});
