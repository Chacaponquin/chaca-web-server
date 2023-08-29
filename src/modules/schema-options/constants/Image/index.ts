import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export const ImageOptions: SchemaOption[] = [
  new SchemaOption({
    name: "Animal",
    schemaField: () => schemas.image.animal(),
  }),
  new SchemaOption({
    name: "Architecture",
    schemaField: () => schemas.image.architecture(),
  }),
  new SchemaOption({
    name: "Art",
    schemaField: () => schemas.image.art(),
  }),
  new SchemaOption({
    name: "Event",
    schemaField: () => schemas.image.event(),
  }),
  new SchemaOption({
    name: "Fashion",
    schemaField: () => schemas.image.fashion(),
  }),
  new SchemaOption({
    name: "Film",
    schemaField: () => schemas.image.film(),
  }),
  new SchemaOption({
    name: "Food",
    schemaField: () => schemas.image.food(),
  }),
  new SchemaOption({
    name: "Health",
    schemaField: () => schemas.image.health(),
  }),
  new SchemaOption({
    name: "History",
    schemaField: () => schemas.image.history(),
  }),
  new SchemaOption({
    name: "House",
    schemaField: () => schemas.image.house(),
  }),
  new SchemaOption({
    name: "Nature",
    schemaField: () => schemas.image.nature(),
  }),
  new SchemaOption({
    name: "People",
    schemaField: () => schemas.image.people(),
  }),
  new SchemaOption({
    name: "Spiritual",
    schemaField: () => schemas.image.spiritual(),
  }),
  new SchemaOption({
    name: "Sport",
    schemaField: () => schemas.image.sport(),
  }),
  new SchemaOption({
    name: "Street",
    schemaField: () => schemas.image.street(),
  }),
  new SchemaOption({
    name: "Travel",
    schemaField: () => schemas.image.travel(),
  }),
  new SchemaOption({
    name: "3D",
    schemaField: () => schemas.image.treeDimension(),
  }),
  new SchemaOption({
    name: "Wallpaper",
    schemaField: () => schemas.image.wallpaper(),
  }),
  new SchemaOption({
    name: "Animate Avatar",
    schemaField: () => schemas.image.animateAvatar(),
  }),
];
