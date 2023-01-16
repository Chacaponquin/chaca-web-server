import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";

const SEX_ARGUMENTS = [
  {
    argument: "sex",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["male", "female"],
    description: { en: "", es: "" },
  },
];

const LANGUAGE_ARGUMENTS = [
  {
    argument: "language",
    inputType: ARGUMENT_TYPE.SELECT,
    description: { en: "", es: "" },
    selectValues: ["en", "es"],
  },
];

const NAME_FIELD_ARGUMENTS = [...SEX_ARGUMENTS, ...LANGUAGE_ARGUMENTS];

export const PersonOptions: SubOption[] = [
  {
    name: "Last Name",
    arguments: LANGUAGE_ARGUMENTS,
    exampleValue: schemas.person.lastName().getValue(),
    getValue: (a) => schemas.person.lastName().getValue(a),
    description: { en: "", es: "" },
  },
  {
    name: "Full Name",
    arguments: NAME_FIELD_ARGUMENTS,
    getValue: (a) => schemas.person.fullName().getValue(a),
    description: { en: "", es: "" },
    exampleValue: schemas.person.fullName().getValue(),
  },
  {
    name: "First Name",
    arguments: NAME_FIELD_ARGUMENTS,
    getValue: (a) => schemas.person.firstName().getValue(a),
    exampleValue: schemas.person.firstName().getValue(),
    description: { en: "", es: "" },
  },
  {
    name: "Prefix",
    arguments: SEX_ARGUMENTS,
    getValue: (a) => schemas.person.prefix().getValue(a),
    exampleValue: schemas.person.prefix().getValue(),
    description: { en: "", es: "" },
  },
  {
    name: "Job Area",
    getValue: (a) => schemas.person.jobArea().getValue(a),
    exampleValue: schemas.person.jobArea().getValue(),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Job Level",
    getValue: (a) => schemas.person.jobLevel().getValue(a),
    exampleValue: schemas.person.jobLevel().getValue(),
    arguments: [],
    description: { en: "", es: "" },
  },
];
