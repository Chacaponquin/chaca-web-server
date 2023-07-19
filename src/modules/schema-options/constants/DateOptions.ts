import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";

export const DateOptions: SubOption[] = [
  {
    schemaField: schemas.date.timeAgo(),
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
    schemaField: schemas.date.soon(),
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
    schemaField: schemas.date.past(),
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
    schemaField: schemas.date.future(),
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
    schemaField: schemas.date.month(),
    name: "Month",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: schemas.date.weekDay(),
    name: "Weekday",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: schemas.date.birthdate(),
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
    schemaField: schemas.date.between(),
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
