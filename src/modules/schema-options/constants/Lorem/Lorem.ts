import { schemas } from "chaca";
import { SchemaOption } from "@modules/schema-options/interfaces/options";
import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";

export const LoremOptions: SchemaOption[] = [
  {
    name: "Paragraphs",
    schemaField: (a) => schemas.lorem.paragraphs(a),
    arguments: [
      {
        argument: "paragraphsCount",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Cantidad de párrafos" },
      },
      {
        argument: "separator",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "Separador entre los párrafos" },
      },
      {
        argument: "maxSentences",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Máxima cantidad de oraciones" },
      },
      {
        argument: "minSentences",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Mínima cantidad de oraciones" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    name: "Sentences",
    schemaField: (a) => schemas.lorem.sentences(a),
    arguments: [
      {
        argument: "sentencesCount",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Cantidad de oraciones" },
      },
      {
        argument: "separator",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "Separador entre las oraciones" },
      },
      {
        argument: "wordsMin",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Mínima cantidad de palabras por oración" },
      },
      {
        argument: "wordsMax",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Máxima cantidad de palabras por oración" },
      },
    ],
    description: { en: "", es: "Devuelve una serie de oraciones" },
  },
  {
    name: "Slug",
    schemaField: (a) => schemas.lorem.slug(a),
    arguments: [
      {
        argument: "wordCount",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Cantidad de palabras" },
      },
    ],
    description: { en: "", es: "Devuelve un slug" },
  },
  {
    name: "Text",
    schemaField: (a) => schemas.lorem.text(a),
    arguments: [
      {
        argument: "character_max",
        description: {
          en: "",
          es: "Cantidad máxima de caracteres que debe tener el texto",
        },
        inputType: ARGUMENT_TYPE.NUMBER,
      },
      {
        argument: "character_min",
        description: {
          en: "",
          es: "Cantidad mínima de caracteres que debe tener el texto",
        },
        inputType: ARGUMENT_TYPE.NUMBER,
      },
    ],
    description: { en: "", es: "Devuelve un texto" },
  },
  {
    name: "Words",
    schemaField: (a) => schemas.lorem.words(a),
    arguments: [
      {
        argument: "count",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Cantidad de palabras" },
      },
    ],
    description: { en: "", es: "Devuelve una serie de palabras" },
  },
];
