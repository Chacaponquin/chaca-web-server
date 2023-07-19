import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";

export const InternetOptions: SubOption[] = [
  {
    schemaField: schemas.internet.domainName(),
    name: "Domain Name",
    arguments: [],
    description: { en: "", es: "Devuelve un nombre de dominio web" },
  },
  {
    schemaField: schemas.internet.email(),
    name: "Email",
    arguments: [
      {
        argument: "firstName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "Primer nombre del usuario" },
      },
      {
        argument: "lastName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "Apellido del usuario" },
      },
      {
        argument: "provider",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "Proveedor de email" },
      },
    ],
    description: { en: "", es: "Devuelve un email de usuario" },
  },
  {
    schemaField: schemas.internet.password(),
    name: "Password",
    arguments: [
      {
        argument: "len",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Tamaño de la contraseña" },
      },
      {
        argument: "memorable",
        inputType: ARGUMENT_TYPE.BOOLEAN,
        description: {
          en: "",
          es: "Indica si la contraseña debe ser recordable",
        },
      },
      {
        argument: "prefix",
        description: {
          en: "",
          es: "Expresión regular que indica el patrón de la contraseña",
        },
        inputType: ARGUMENT_TYPE.TEXT,
      },
    ],
    description: { en: "", es: "Devuelve una contraseña de usuario" },
  },
  {
    schemaField: schemas.internet.url(),
    name: "Url",
    arguments: [
      {
        argument: "secure",
        description: {
          en: "",
          es: "Indica si el url debe tener un protocolo seguro",
        },
        inputType: ARGUMENT_TYPE.BOOLEAN,
      },
    ],
    description: { en: "", es: "Devuelve la url de una página web" },
  },
  {
    schemaField: schemas.internet.userName(),
    name: "User Name",
    arguments: [
      {
        argument: "firstName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "Primer nombre del usuario" },
      },
      {
        argument: "lastName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "Apellido del usuario" },
      },
    ],
    description: { en: "", es: "Devuelve el nombre de usuario" },
  },
  {
    schemaField: schemas.internet.httpMethod(),
    description: { en: "", es: "Devuelve un método HTTP" },
    name: "HTTP Method",
    arguments: [],
  },
  {
    schemaField: schemas.internet.ipv4(),
    name: "Ipv4",
    arguments: [],
    description: { en: "", es: "Devuelve una dirección IPv4" },
  },
  {
    schemaField: schemas.internet.emoji(),
    name: "Emoji",
    arguments: [],
    description: { en: "", es: "Devuelve el código de un emoji" },
  },
  {
    schemaField: schemas.internet.mac(),
    description: { en: "", es: "Devuelve una direccióm MAC" },
    name: "Mac Address",
    arguments: [],
  },
  {
    schemaField: schemas.internet.port(),
    description: { en: "", es: "Devuelve el número de un puerto" },
    name: "Port",
    arguments: [],
  },
  {
    schemaField: schemas.internet.userAgent(),
    name: "User Agent",
    arguments: [],
    description: { en: "", es: "Devuelve un user agent de un navegador web" },
  },
  {
    schemaField: schemas.internet.protocol(),
    name: "Protocol",
    arguments: [],
    description: { en: "", es: "Devuelve un protocolo http" },
  },
  {
    schemaField: schemas.internet.domainSuffix(),
    name: "Domain Suffix",
    arguments: [],
    description: { en: "", es: "Devuelve un sufijo de un dominio web" },
  },
  {
    schemaField: schemas.internet.httpStatusCode(),
    name: "HTTP Status Code",
    arguments: [],
    description: { en: "", es: "Devuelve un código de respuesta HTTP" },
  },
];
