import { SchemaOption } from "@modules/schema-options/domain";
import Between from "./Between";
import Birthdate from "./Birthdate";
import Future from "./Future";
import Month from "./Month";
import Past from "./Past";
import Soon from "./Soon";
import TimeAgo from "./TimeAgo";
import Weekday from "./Weekday";

export const DateOptions: SchemaOption[] = [
  Between,
  Birthdate,
  Future,
  Month,
  Past,
  Soon,
  TimeAgo,
  Weekday,
];
