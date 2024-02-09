import { SchemaOption } from "@modules/schema-options/domain";
import { chaca } from "chaca";
import { VIDEOS_DEFINITIONS } from "./constants";

export const VideoOptions: SchemaOption[] = [
  new SchemaOption({
    name: "Animal",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["animal"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Architecture",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["architecture"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Art",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["art"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Event",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["event"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Fashion",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["fashion"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Food",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["food"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Health",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["health"]),
      )();
    },
  }),
  new SchemaOption({
    name: "History",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["history"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Nature",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["nature"]),
      )();
    },
  }),
  new SchemaOption({
    name: "People",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["people"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Spiritual",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["spirituality"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Sport",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["sport"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Street",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["street"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Travel",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["travel"]),
      )();
    },
  }),
  new SchemaOption({
    name: "3D",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["3d"]),
      )();
    },
  }),
  new SchemaOption({
    name: "Wallpaper",
    schemaField() {
      return chaca.schemaField(() =>
        chaca.utils.oneOfArray(VIDEOS_DEFINITIONS["wallpaper"]),
      )();
    },
  }),
];
