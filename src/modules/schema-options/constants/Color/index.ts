import { SchemaOption } from "@modules/schema-options/domain";
import Cmyk from "./Cmyk";
import Hsl from "./Hsl";
import Hwb from "./Hwb";
import Lch from "./Lch";
import Rgb from "./Rgb";

export const ColorOptions: SchemaOption[] = [Cmyk, Hsl, Hwb, Lch, Rgb];
