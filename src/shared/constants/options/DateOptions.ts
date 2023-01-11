import { OptionSchema } from "../../interfaces/options.interface";
import { ARGUMENT_TYPE } from "../enums/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";

export const DateOptions: OptionSchema[] = [
  {
    exampleValue: schemas.date.timeAgo().getValue(),
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
    getValue: (a) => schemas.date.timeAgo().getValue(a),
  },
  {
    exampleValue: schemas.date.soon().getValue(),
    getValue: (a) => schemas.date.soon().getValue(a),
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
    exampleValue: schemas.date.past().getValue(),
    getValue: (a) => schemas.date.past().getValue(a),
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
    exampleValue: schemas.date.future().getValue(),
    getValue: (a) => schemas.date.future().getValue(a),
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
    exampleValue: schemas.date.month().getValue(),
    getValue: (a) => schemas.date.month().getValue(a),
    name: "Month",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.weekDay().getValue(),
    getValue: (a) => schemas.date.weekDay().getValue(a),
    name: "Weekday",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.birthdate().getValue(),
    getValue: (a) => schemas.date.birthdate().getValue(a),
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
    exampleValue: schemas.date.between().getValue(),
    getValue: (a) => schemas.date.between().getValue(a),
    name: "Date Between",
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
