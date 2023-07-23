import { FAQ } from "../interfaces/faq";

export const ALL_FAQ: FAQ[] = [
  {
    question: "Cuál es el máximo de datasets que se pueden crear",
    answer:
      "Eso depende de tu rango de usuario. Si te creas una cuenta tendrás más límite para la creación de datasets, incluso si te conviertes en super usuario puedes crear hasta 10 datasets de una sola vez",
    userEmail: "hectorangel2001@gmail.com",
  },
  {
    question: "Existe un límite máximo de documentos a crear",
    answer:
      "El límite de documentos no es general sino que por cada dataset tienes un limite de doumentos que puedes crear depende de tu rango de usuario. Puedes leer más sobre estas restricciones en la sección de API",
    userEmail: "",
  },
  {
    question: "Han creado una librería que contenga estas funcionalidades",
    answer:
      "Por ahora no, pero estamos desarrollando una para permitir la creación de datos en proyectos sin necesidad de utilizar la REST API",
    userEmail: "",
  },
];
