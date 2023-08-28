import { SchemaOption } from "../../interfaces/options";
import { schemas } from "chaca";

export const AnimalOptions: SchemaOption[] = [
  {
    name: "Bear",
    schemaField: () => schemas.animal.bear(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de oso" },
  },
  {
    name: "Bird",
    schemaField: () => schemas.animal.bird(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de ave" },
  },
  {
    name: "Cat",
    schemaField: () => schemas.animal.cat(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de gato" },
  },
  {
    name: "Cetacean",
    schemaField: () => schemas.animal.cetacean(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de cetáceo" },
  },
  {
    name: "Cow",
    schemaField: () => schemas.animal.cow(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de vaca" },
  },
  {
    name: "Crocodilia",
    schemaField: () => schemas.animal.crocodilia(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de cocodrilo" },
  },
  {
    name: "Dog",
    schemaField: () => schemas.animal.dog(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de perro" },
  },
  {
    name: "Horse",
    schemaField: () => schemas.animal.horse(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de caballo" },
  },
  {
    name: "Insect",
    schemaField: () => schemas.animal.insect(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de insecto" },
  },
  {
    name: "Lion",
    schemaField: () => schemas.animal.lion(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de león" },
  },
  {
    name: "Rabbit",
    schemaField: () => schemas.animal.rabbit(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de conejo" },
  },
  {
    name: "Snake",
    schemaField: () => schemas.animal.snake(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de serpiente" },
  },
  {
    name: "Animal Type",
    schemaField: () => schemas.animal.animalType(),
    arguments: [],
    description: { en: "", es: "Devuelve el nombre de un tipo de animal" },
  },
];
