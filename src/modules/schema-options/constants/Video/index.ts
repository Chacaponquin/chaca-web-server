import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export const VideoOptions: SchemaOption[] = [
  new SchemaOption({
    name: "Animal",
    schemaField: () => schemas.video.animal(),
  }),
  new SchemaOption({
    name: "Architecture",
    schemaField: () => schemas.video.architecture(),
  }),
  new SchemaOption({
    name: "Art",
    schemaField: () => schemas.video.art(),
  }),
  new SchemaOption({
    name: "Event",
    schemaField: () => schemas.video.event(),
  }),
  new SchemaOption({
    name: "Fashion",
    schemaField: () => schemas.video.fashion(),
  }),
  new SchemaOption({
    name: "Food",
    schemaField: () => schemas.video.food(),
  }),
  new SchemaOption({
    name: "Health",
    schemaField: () => schemas.video.health(),
  }),
  new SchemaOption({
    name: "History",
    schemaField: () => schemas.video.history(),
  }),
  new SchemaOption({
    name: "Nature",
    schemaField: () => schemas.video.nature(),
  }),
  new SchemaOption({
    name: "People",
    schemaField: () => schemas.video.people(),
  }),
  new SchemaOption({
    name: "Spiritual",
    schemaField: () => schemas.video.spiritual(),
  }),
  new SchemaOption({
    name: "Sport",
    schemaField: () => schemas.video.sport(),
  }),
  new SchemaOption({
    name: "Street",
    schemaField: () => schemas.video.street(),
  }),
  new SchemaOption({
    name: "Travel",
    schemaField: () => schemas.video.travel(),
  }),
  new SchemaOption({
    name: "3D",
    schemaField: () => schemas.video.threeDimension(),
  }),
  new SchemaOption({
    name: "Wallpaper",
    schemaField: () => schemas.video.wallpaper(),
  }),
];
