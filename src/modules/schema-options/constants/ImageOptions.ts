import { SchemaOption } from "@modules/schema-options/interfaces/options.interface";
import { schemas } from "chaca";

export const ImageOptions: SchemaOption[] = [
  {
    name: "Animal",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.animal(),
    arguments: [],
  },
  {
    name: "Architecture",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.architecture(),
    arguments: [],
  },
  {
    name: "Art",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.art(),
    arguments: [],
  },
  {
    name: "Event",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.event(),
    arguments: [],
  },
  {
    name: "Fashion",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.fashion(),
    arguments: [],
  },
  {
    name: "Film",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.film(),
    arguments: [],
  },
  {
    name: "Food",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.food(),
    arguments: [],
  },
  {
    name: "Health",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.health(),
    arguments: [],
  },
  {
    name: "History",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.history(),
    arguments: [],
  },
  {
    name: "House",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.house(),
    arguments: [],
  },
  {
    name: "Nature",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.nature(),
    arguments: [],
  },
  {
    name: "People",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.people(),
    arguments: [],
  },
  {
    name: "Spiritual",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.spiritual(),
    arguments: [],
  },
  {
    name: "Sport",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.sport(),
    arguments: [],
  },
  {
    name: "Street",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.street(),
    arguments: [],
  },
  {
    name: "Travel",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.travel(),
    arguments: [],
  },
  {
    name: "3D",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.treeDimension(),
    arguments: [],
  },
  {
    name: "Wallpaper",
    description: { en: "", es: "" },
    schemaField: () => schemas.image.wallpaper(),
    arguments: [],
  },
  {
    name: "Animate Avatar",
    schemaField: () => schemas.image.animateAvatar(),
    arguments: [],
    description: { en: "", es: "" },
  },
];
