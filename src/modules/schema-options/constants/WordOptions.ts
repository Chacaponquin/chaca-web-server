import { schemas } from "chaca";
import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";

const LANGUAGE_ARGUMENT = [
  {
    argument: "language",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["es", "en"],
    description: { es: "", en: "" },
  },
];

export const WordOptions: SubOption[] = [
  {
    name: "Adjective",
    getValue: (a) => schemas.word.adjective().getValue(a),
    exampleValue: schemas.word.adjective().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Adverb",
    getValue: (a) => schemas.word.adverb().getValue(a),
    exampleValue: schemas.word.adverb().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Conjuction",
    getValue: (a) => schemas.word.conjuction().getValue(a),
    exampleValue: schemas.word.conjuction().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Interjection",
    getValue: (a) => schemas.word.interjection().getValue(a),
    exampleValue: schemas.word.interjection().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Noun",
    getValue: (a) => schemas.word.noun().getValue(a),
    exampleValue: schemas.word.noun().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Preposition",
    getValue: (a) => schemas.word.preposition().getValue(a),
    exampleValue: schemas.word.preposition().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Verb",
    getValue: (a) => schemas.word.verb().getValue(a),
    exampleValue: schemas.word.verb().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
];
