import { SchemaOption } from "@modules/schema-options/domain";
import CallDuration from "./CallDuration";
import Number from "./Number";
import Prefix from "./Prefix";

export const PhoneOptions: SchemaOption[] = [CallDuration, Number, Prefix];
