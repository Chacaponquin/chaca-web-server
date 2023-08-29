import { SchemaOption } from "@modules/schema-options/domain";
import FirstName from "./options/FirstName";
import FullName from "./options/FullName";
import JobArea from "./options/JobArea";
import JobLevel from "./options/JobLevel";
import LastName from "./options/LastName";
import Prefix from "./options/Prefix";

export const PersonOptions: SchemaOption[] = [
  FirstName,
  FullName,
  JobArea,
  JobLevel,
  LastName,
  Prefix,
];
