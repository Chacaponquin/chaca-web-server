import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";

export const VideoOptions: SubOption[] = [
  {
    name: "Animal",
    getValue: (a) => schemas.video.animal().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática animal" },
    exampleValue: schemas.video.animal().getValue(),
    arguments: [],
  },
  {
    name: "Architecture",
    getValue: (a) => schemas.video.architecture().getValue(a),
    description: {
      en: "",
      es: "Devuelve un video de la temática arquitectura",
    },
    exampleValue: schemas.video.architecture().getValue(),
    arguments: [],
  },
  {
    name: "Art",
    getValue: (a) => schemas.video.art().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática arte" },
    exampleValue: schemas.video.art().getValue(),
    arguments: [],
  },
  {
    name: "Event",
    getValue: (a) => schemas.video.event().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática evento" },
    exampleValue: schemas.video.event().getValue(),
    arguments: [],
  },
  {
    name: "Fashion",
    getValue: (a) => schemas.video.fashion().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática moda" },
    exampleValue: schemas.video.fashion().getValue(),
    arguments: [],
  },
  {
    name: "Food",
    getValue: (a) => schemas.video.food().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática comida" },
    exampleValue: schemas.video.food().getValue(),
    arguments: [],
  },
  {
    name: "Health",
    getValue: (a) => schemas.video.health().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática salud" },
    exampleValue: schemas.video.health().getValue(),
    arguments: [],
  },
  {
    name: "History",
    getValue: (a) => schemas.video.history().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática historia" },
    exampleValue: schemas.video.history().getValue(),
    arguments: [],
  },
  {
    name: "Nature",
    getValue: (a) => schemas.video.nature().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática naturaleza" },
    exampleValue: schemas.video.nature().getValue(),
    arguments: [],
  },
  {
    name: "People",
    getValue: (a) => schemas.video.people().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática persona" },
    exampleValue: schemas.video.people().getValue(),
    arguments: [],
  },
  {
    name: "Spiritual",
    getValue: (a) => schemas.video.spiritual().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática espiritual" },
    exampleValue: schemas.video.spiritual().getValue(),
    arguments: [],
  },
  {
    name: "Sport",
    getValue: (a) => schemas.video.sport().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática deporte" },
    exampleValue: schemas.video.sport().getValue(),
    arguments: [],
  },
  {
    name: "Street",
    getValue: (a) => schemas.video.street().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática calle" },
    exampleValue: schemas.video.street().getValue(),
    arguments: [],
  },
  {
    name: "Travel",
    getValue: (a) => schemas.video.travel().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática viaje" },
    exampleValue: schemas.video.travel().getValue(),
    arguments: [],
  },
  {
    name: "3D",
    getValue: (a) => schemas.video.treeDimension().getValue(a),
    description: { en: "", es: "Devuelve un video de la temática 3D" },
    exampleValue: schemas.video.treeDimension().getValue(),
    arguments: [],
  },
  {
    name: "Wallpaper",
    getValue: (a) => schemas.video.wallpaper().getValue(a),
    description: {
      en: "",
      es: "Devuelve un video con efecto de fondo de pantalla",
    },
    exampleValue: schemas.video.wallpaper().getValue(),
    arguments: [],
  },
];
