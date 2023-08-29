import { schemas } from "chaca";
import { SchemaOption } from "@modules/schema-options/domain";
import Domain from "./Domain";
import Email from "./Email";
import Password from "./Password";
import Url from "./Url";
import Username from "./Username";

export const InternetOptions: SchemaOption[] = [
  new SchemaOption({
    schemaField: () => schemas.internet.httpMethod(),
    name: "HTTP Method",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.ipv4(),
    name: "Ipv4",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.emoji(),
    name: "Emoji",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.mac(),
    name: "Mac Address",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.port(),
    name: "Port",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.userAgent(),
    name: "User Agent",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.protocol(),
    name: "Protocol",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.domainSuffix(),
    name: "Domain Suffix",
  }),
  new SchemaOption({
    schemaField: () => schemas.internet.httpStatusCode(),
    name: "HTTP Status Code",
  }),
  Domain,
  Email,
  Password,
  Url,
  Username,
];
