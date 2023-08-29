import { SchemaOption } from "@modules/schema-options/domain";
import Cardinal from "./Cardinal";
import Country from "./Country";
import CountryCode from "./CountryCode";
import TimeZone from "./TimeZone";
import ZipCode from "./ZipCode";

export const AddressOptions: SchemaOption[] = [
  Cardinal,
  Country,
  CountryCode,
  TimeZone,
  ZipCode,
];
