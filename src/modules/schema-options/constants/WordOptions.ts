import { schemas } from "chaca";
import { SchemaOption } from "@modules/schema-options/interfaces/options";
import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";

const LANGUAGE_ARGUMENT = [
  {
    argument: "language",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["es", "en"],
    description: {
      es: "",
      en: "Lenguage de la palabra a generar. Por defecto será ingles ('en')",
    },
  },
];

export const WordOptions: SchemaOption[] = [
  {
    name: "Adjective",
    schemaField: (a) => schemas.word.adjective(a),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un adjetivo" },
  },
  {
    name: "Adverb",
    schemaField: (a) => schemas.word.adverb(a),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un adverbio" },
  },
  {
    name: "Conjuction",
    schemaField: (a) => schemas.word.conjuction(a),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve una conjunción" },
  },
  {
    name: "Interjection",
    schemaField: (a) => schemas.word.interjection(a),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve una intersección" },
  },
  {
    name: "Noun",
    schemaField: (a) => schemas.word.noun(a),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un sustantivo" },
  },
  {
    name: "Preposition",
    schemaField: (a) => schemas.word.preposition(a),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve una preposición" },
  },
  {
    name: "Verb",
    schemaField: (a) => schemas.word.verb(a),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un verbo" },
  },
];
