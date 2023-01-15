import { ApiSection } from "../interfaces/apiSections.interface";

export const API_SECTIONS: Array<ApiSection> = [
  {
    sectionTitle: { en: "Introduction", es: "Introducción" },
    subSections: [
      {
        document: "what-is-chaca",
        title: { en: "What is Chaca?", es: "Qué es Chaca?" },
      },
      {
        document: "what-is-a-dataset",
        title: { en: "What is a Dataset?", es: "Qué es un Dataset?" },
      },
    ],
    section: "introduction",
  },
  {
    sectionTitle: { en: "Tool", es: "Herramienta" },
    subSections: [],
    section: "tool",
  },
];
