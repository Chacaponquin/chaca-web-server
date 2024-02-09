import { SchemaOption } from "@modules/schema-options/domain";
import { schemas, chaca } from "chaca";
import { IMAGES_DEFINITIONS } from "./constants";

export const ImageOptions: SchemaOption[] = [
  new SchemaOption({
    name: "Animal",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["animal"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Architecture",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["architecture"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Art",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["art"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Event",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["event"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Fashion",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["fashion"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Film",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["film"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Food",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["food"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Health",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["health"]),
      )();
    },
  }),
  new SchemaOption({
    name: "History",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["history"]),
      )();
    },
  }),
  new SchemaOption({
    name: "House",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["house"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Nature",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["nature"]),
      )();
    },
  }),
  new SchemaOption({
    name: "People",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["people"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Spiritual",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["spirituality"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Sport",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["sport"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Street",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["street"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Travel",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["travel"]),
      )();
    },
  }),
  new SchemaOption({
    name: "3D",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["3d"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Wallpaper",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(IMAGES_DEFINITIONS["wallpaper"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Animate Avatar",
    schemaField() {
      return schemas.image.animateAvatar();
    },
  }),
];
