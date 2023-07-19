import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";

export const LoremOptions: SubOption[] = [
  {
    name: "Paragraphs",
    schemaField: schemas.lorem.paragraphs(),
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
    schemaField: schemas.lorem.sentences(),
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
    schemaField: schemas.lorem.slug(),
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
    schemaField: schemas.lorem.text(),
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
    schemaField: schemas.lorem.words(),
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
