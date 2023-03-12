import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";

const SEX_ARGUMENTS = [
  {
    argument: "sex",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["male", "female"],
    description: { en: "", es: "Sexo del nombre de la persona" },
  },
];

const LANGUAGE_ARGUMENTS = [
  {
    argument: "language",
    inputType: ARGUMENT_TYPE.SELECT,
    description: { en: "", es: "Lenguage del nombre de la persona" },
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
    description: { en: "", es: "Devuelve el apellido de una persona" },
  },
  {
    name: "Full Name",
    arguments: NAME_FIELD_ARGUMENTS,
    getValue: (a) => schemas.person.fullName().getValue(a),
    description: { en: "", es: "Devuelve el nombre completo de una persona" },
    exampleValue: schemas.person.fullName().getValue(),
  },
  {
    name: "First Name",
    arguments: NAME_FIELD_ARGUMENTS,
    getValue: (a) => schemas.person.firstName().getValue(a),
    exampleValue: schemas.person.firstName().getValue(),
    description: { en: "", es: "Devuelve el primer nombre de una persona" },
  },
  {
    name: "Prefix",
    arguments: SEX_ARGUMENTS,
    getValue: (a) => schemas.person.prefix().getValue(a),
    exampleValue: schemas.person.prefix().getValue(),
    description: { en: "", es: "Devuelve el prefijo de una persona" },
  },
  {
    name: "Job Area",
    getValue: (a) => schemas.person.jobArea().getValue(a),
    exampleValue: schemas.person.jobArea().getValue(),
    arguments: [],
    description: { en: "", es: "Devuelve el área de un puesto de trabajo" },
  },
  {
    name: "Job Level",
    getValue: (a) => schemas.person.jobLevel().getValue(a),
    exampleValue: schemas.person.jobLevel().getValue(),
    arguments: [],
    description: { en: "", es: "Devuelve el nivel de un puesto de trabajo" },
  },
];
