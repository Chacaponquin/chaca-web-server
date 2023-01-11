import { schemas } from "chaca";
import { OptionSchema } from "../../interfaces/options.interface";
import { ARGUMENT_TYPE } from "../enums/ARGUMENT_TYPE.enum";

export const InternetOptions: OptionSchema[] = [
  {
    exampleValue: schemas.internet.domainName().getValue(),
    getValue: (a) => schemas.internet.domainName().getValue(a),
    name: "Domain Name",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.email().getValue(),
    getValue: (a) => schemas.internet.email().getValue(a),
    name: "Email",
    arguments: [
      {
        argument: "firstName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
      {
        argument: "lastName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
      {
        argument: "provider",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.password().getValue(),
    getValue: (a) => schemas.internet.password().getValue(a),
    name: "Password",
    arguments: [
      {
        argument: "len",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "memorable",
        inputType: ARGUMENT_TYPE.BOOLEAN,
        description: { en: "", es: "" },
      },
      {
        argument: "prefix",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.TEXT,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.url().getValue(),
    getValue: (a) => schemas.internet.url().getValue(a),
    name: "Url",
    arguments: [
      {
        argument: "secure",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.BOOLEAN,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.userName().getValue(),
    getValue: (a) => schemas.internet.userName().getValue(a),
    name: "User Name",
    arguments: [
      {
        argument: "firstName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
      {
        argument: "lastName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.httpMethod().getValue(),
    description: { en: "", es: "" },
    getValue: (a) => schemas.internet.httpMethod().getValue(a),
    name: "HTTP Method",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.ipv4().getValue(),
    getValue: (a) => schemas.internet.ipv4().getValue(a),
    name: "Ipv4",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.emoji().getValue(),
    getValue: (a) => schemas.internet.emoji().getValue(a),
    name: "Emoji",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.mac().getValue(),
    description: { en: "", es: "" },
    getValue: (a) => schemas.internet.mac().getValue(a),
    name: "Mac Address",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.port().getValue(),
    description: { en: "", es: "" },
    getValue: (a) => schemas.internet.port().getValue(a),
    name: "Port",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.userAgent().getValue(),
    getValue: (a) => schemas.internet.userAgent().getValue(a),
    name: "User Agent",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.protocol().getValue(),
    getValue: (a) => schemas.internet.protocol().getValue(a),
    name: "Protocol",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.domainSuffix().getValue(),
    getValue: (a) => schemas.internet.domainSuffix().getValue(a),
    name: "Domain Suffix",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.httpStatusCode().getValue(),
    getValue: (a) => schemas.internet.httpStatusCode().getValue(a),
    name: "HTTP Status Code",
    arguments: [],
    description: { en: "", es: "" },
  },
];
