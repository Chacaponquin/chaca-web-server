import { schemas } from "chaca";
import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { SchemaOption } from "@modules/schema-options/domain";

const LANGUAGE_ARGUMENT = [
  {
    argument: "language",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["es", "en"],
  },
];

export const WordOptions: SchemaOption[] = [
  new SchemaOption({
    name: "Adjective",
    schemaField: (a) => schemas.word.adjective(a),
    args: LANGUAGE_ARGUMENT,
  }),
  new SchemaOption({
    name: "Adverb",
    schemaField: (a) => schemas.word.adverb(a),
    args: LANGUAGE_ARGUMENT,
  }),
  new SchemaOption({
    name: "Conjuction",
    schemaField: (a) => schemas.word.conjuction(a),
    args: LANGUAGE_ARGUMENT,
  }),
  new SchemaOption({
    name: "Interjection",
    schemaField: (a) => schemas.word.interjection(a),
    args: LANGUAGE_ARGUMENT,
  }),
  new SchemaOption({
    name: "Noun",
    schemaField: (a) => schemas.word.noun(a),
    args: LANGUAGE_ARGUMENT,
  }),
  new SchemaOption({
    name: "Preposition",
    schemaField: (a) => schemas.word.preposition(a),
    args: LANGUAGE_ARGUMENT,
  }),
  new SchemaOption({
    name: "Verb",
    schemaField: (a) => schemas.word.verb(a),
    args: LANGUAGE_ARGUMENT,
  }),
];
