import { SchemaOption } from "../../interfaces/options";
import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { schemas } from "chaca";

export const DateOptions: SchemaOption[] = [
  {
    schemaField: (a) => schemas.date.timeAgo(a),
    name: "Time Ago",
    description: { en: "", es: "" },
    arguments: [
      {
        argument: "unit",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.SELECT,
        selectValues: [
          "years",
          "seconds",
          "minutes",
          "days",
          "hours",
          "months",
        ],
      },
    ],
  },
  {
    schemaField: (a) => schemas.date.soon(a),
    name: "Date Soon",
    arguments: [
      {
        argument: "days",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    schemaField: (a) => schemas.date.past(a),
    name: "Date Past",
    arguments: [
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
      {
        argument: "years",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    schemaField: (a) => schemas.date.future(a),
    name: "Date Future",
    arguments: [
      {
        argument: "years",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.date.month(),
    name: "Month",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.date.weekDay(),
    name: "Weekday",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: (a) => schemas.date.birthdate(a),
    name: "BirthDate",
    arguments: [
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
      {
        argument: "mode",
        inputType: ARGUMENT_TYPE.SELECT,
        description: { en: "", es: "" },
        selectValues: ["year", "age"],
      },
    ],
    description: { en: "", es: "" },
  },
  {
    schemaField: (a) => schemas.date.between(a),
    name: "Between",
    arguments: [
      {
        argument: "from",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
      {
        argument: "to",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
];
