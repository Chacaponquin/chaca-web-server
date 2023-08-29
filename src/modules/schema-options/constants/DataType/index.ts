import { SchemaOption } from "@modules/schema-options/domain";
import Boolean from "./Boolean";
import Float from "./Float";
import Hexadecimal from "./Hexadecimal";
import Int from "./Int";
import Matrix from "./Matrix";

export const DataTypeOptions: SchemaOption[] = [
  Boolean,
  Float,
  Hexadecimal,
  Int,
  Matrix,
];
