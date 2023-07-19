import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";

export const VideoOptions: SubOption[] = [
  {
    name: "Animal",
    description: { en: "", es: "Devuelve un video de la temática animal" },
    schemaField: schemas.video.animal(),
    arguments: [],
  },
  {
    name: "Architecture",
    description: {
      en: "",
      es: "Devuelve un video de la temática arquitectura",
    },
    schemaField: schemas.video.architecture(),
    arguments: [],
  },
  {
    name: "Art",
    description: { en: "", es: "Devuelve un video de la temática arte" },
    schemaField: schemas.video.art(),
    arguments: [],
  },
  {
    name: "Event",
    description: { en: "", es: "Devuelve un video de la temática evento" },
    schemaField: schemas.video.event(),
    arguments: [],
  },
  {
    name: "Fashion",
    description: { en: "", es: "Devuelve un video de la temática moda" },
    schemaField: schemas.video.fashion(),
    arguments: [],
  },
  {
    name: "Food",
    description: { en: "", es: "Devuelve un video de la temática comida" },
    schemaField: schemas.video.food(),
    arguments: [],
  },
  {
    name: "Health",
    description: { en: "", es: "Devuelve un video de la temática salud" },
    schemaField: schemas.video.health(),
    arguments: [],
  },
  {
    name: "History",
    description: { en: "", es: "Devuelve un video de la temática historia" },
    schemaField: schemas.video.history(),
    arguments: [],
  },
  {
    name: "Nature",
    description: { en: "", es: "Devuelve un video de la temática naturaleza" },
    schemaField: schemas.video.nature(),
    arguments: [],
  },
  {
    name: "People",
    description: { en: "", es: "Devuelve un video de la temática persona" },
    schemaField: schemas.video.people(),
    arguments: [],
  },
  {
    name: "Spiritual",
    description: { en: "", es: "Devuelve un video de la temática espiritual" },
    schemaField: schemas.video.spiritual(),
    arguments: [],
  },
  {
    name: "Sport",
    description: { en: "", es: "Devuelve un video de la temática deporte" },
    schemaField: schemas.video.sport(),
    arguments: [],
  },
  {
    name: "Street",
    description: { en: "", es: "Devuelve un video de la temática calle" },
    schemaField: schemas.video.street(),
    arguments: [],
  },
  {
    name: "Travel",
    description: { en: "", es: "Devuelve un video de la temática viaje" },
    schemaField: schemas.video.travel(),
    arguments: [],
  },
  {
    name: "3D",
    description: { en: "", es: "Devuelve un video de la temática 3D" },
    schemaField: schemas.video.treeDimension(),
    arguments: [],
  },
  {
    name: "Wallpaper",
    description: {
      en: "",
      es: "Devuelve un video con efecto de fondo de pantalla",
    },
    schemaField: schemas.video.wallpaper(),
    arguments: [],
  },
];
