import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";

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

export const WordOptions: SubOption[] = [
  {
    name: "Adjective",
    schemaField: schemas.word.adjective(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un adjetivo" },
  },
  {
    name: "Adverb",
    schemaField: schemas.word.adverb(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un adverbio" },
  },
  {
    name: "Conjuction",
    schemaField: schemas.word.conjuction(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve una conjunción" },
  },
  {
    name: "Interjection",
    schemaField: schemas.word.interjection(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve una intersección" },
  },
  {
    name: "Noun",
    schemaField: schemas.word.noun(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un sustantivo" },
  },
  {
    name: "Preposition",
    schemaField: schemas.word.preposition(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve una preposición" },
  },
  {
    name: "Verb",
    schemaField: schemas.word.verb(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "Devuelve un verbo" },
  },
];
