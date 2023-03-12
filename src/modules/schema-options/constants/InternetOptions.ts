import { schemas } from "chaca";
import { SubOption } from "@modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";

export const InternetOptions: SubOption[] = [
  {
    exampleValue: schemas.internet.domainName().getValue(),
    getValue: (a) => schemas.internet.domainName().getValue(a),
    name: "Domain Name",
    arguments: [],
    description: { en: "", es: "Devuelve un nombre de dominio web" },
  },
  {
    exampleValue: schemas.internet.email().getValue(),
    getValue: (a) => schemas.internet.email().getValue(a),
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
    exampleValue: schemas.internet.password().getValue(),
    getValue: (a) => schemas.internet.password().getValue(a),
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
    exampleValue: schemas.internet.url().getValue(),
    getValue: (a) => schemas.internet.url().getValue(a),
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
    exampleValue: schemas.internet.userName().getValue(),
    getValue: (a) => schemas.internet.userName().getValue(a),
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
    exampleValue: schemas.internet.httpMethod().getValue(),
    description: { en: "", es: "Devuelve un método HTTP" },
    getValue: (a) => schemas.internet.httpMethod().getValue(a),
    name: "HTTP Method",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.ipv4().getValue(),
    getValue: (a) => schemas.internet.ipv4().getValue(a),
    name: "Ipv4",
    arguments: [],
    description: { en: "", es: "Devuelve una dirección IPv4" },
  },
  {
    exampleValue: schemas.internet.emoji().getValue(),
    getValue: (a) => schemas.internet.emoji().getValue(a),
    name: "Emoji",
    arguments: [],
    description: { en: "", es: "Devuelve el código de un emoji" },
  },
  {
    exampleValue: schemas.internet.mac().getValue(),
    description: { en: "", es: "Devuelve una direccióm MAC" },
    getValue: (a) => schemas.internet.mac().getValue(a),
    name: "Mac Address",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.port().getValue(),
    description: { en: "", es: "Devuelve el número de un puerto" },
    getValue: (a) => schemas.internet.port().getValue(a),
    name: "Port",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.userAgent().getValue(),
    getValue: (a) => schemas.internet.userAgent().getValue(a),
    name: "User Agent",
    arguments: [],
    description: { en: "", es: "Devuelve un user agent de un navegador web" },
  },
  {
    exampleValue: schemas.internet.protocol().getValue(),
    getValue: (a) => schemas.internet.protocol().getValue(a),
    name: "Protocol",
    arguments: [],
    description: { en: "", es: "Devuelve un protocolo http" },
  },
  {
    exampleValue: schemas.internet.domainSuffix().getValue(),
    getValue: (a) => schemas.internet.domainSuffix().getValue(a),
    name: "Domain Suffix",
    arguments: [],
    description: { en: "", es: "Devuelve un sufijo de un dominio web" },
  },
  {
    exampleValue: schemas.internet.httpStatusCode().getValue(),
    getValue: (a) => schemas.internet.httpStatusCode().getValue(a),
    name: "HTTP Status Code",
    arguments: [],
    description: { en: "", es: "Devuelve un código de respuesta HTTP" },
  },
];
