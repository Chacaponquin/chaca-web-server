import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export const AnimalOptions: SchemaOption[] = [
  new SchemaOption({
    name: "Bear",
    schemaField: () => schemas.animal.bear(),
  }),
  new SchemaOption({
    name: "Bird",
    schemaField: () => schemas.animal.bird(),
  }),
  new SchemaOption({
    name: "Cat",
    schemaField: () => schemas.animal.cat(),
  }),
  new SchemaOption({
    name: "Cetacean",
    schemaField: () => schemas.animal.cetacean(),
  }),
  new SchemaOption({
    name: "Cow",
    schemaField: () => schemas.animal.cow(),
  }),
  new SchemaOption({
    name: "Crocodilia",
    schemaField: () => schemas.animal.crocodilia(),
  }),
  new SchemaOption({
    name: "Dog",
    schemaField: () => schemas.animal.dog(),
  }),
  new SchemaOption({
    name: "Horse",
    schemaField: () => schemas.animal.horse(),
  }),
  new SchemaOption({
    name: "Insect",
    schemaField: () => schemas.animal.insect(),
  }),
  new SchemaOption({
    name: "Lion",
    schemaField: () => schemas.animal.lion(),
  }),
  new SchemaOption({
    name: "Rabbit",
    schemaField: () => schemas.animal.rabbit(),
  }),
  new SchemaOption({
    name: "Snake",
    schemaField: () => schemas.animal.snake(),
  }),
  new SchemaOption({
    name: "Animal Type",
    schemaField: () => schemas.animal.animalType(),
  }),
];
