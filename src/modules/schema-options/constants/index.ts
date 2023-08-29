import { Schema } from "../domain";
import { AddressOptions } from "./Address";
import { AnimalOptions } from "./Animal";
import { DataTypeOptions } from "./DataType";
import { DateOptions } from "./Date";
import { FinanceOptions } from "./Finance";
import { IdOptions } from "./Id";
import { ImageOptions } from "./Image";
import { InternetOptions } from "./Internet";
import { LoremOptions } from "./Lorem";
import { PersonOptions } from "./Person";
import { PhoneOptions } from "./Phone";
import { SystemOptions } from "./System";
import { VehicleOptions } from "./Vehicle";
import { VideoOptions } from "./Video";
import { WordOptions } from "./Word";

export const SCHEMAS: Array<Schema> = [
  new Schema({ name: "Address", options: AddressOptions }),
  new Schema({ name: "Animal", options: AnimalOptions }),
  new Schema({ name: "DataType", options: DataTypeOptions }),
  new Schema({ name: "Date", options: DateOptions }),
  new Schema({ name: "Finance", options: FinanceOptions }),
  new Schema({ name: "Id", options: IdOptions }),
  new Schema({ name: "Image", options: ImageOptions }),
  new Schema({ name: "Internet", options: InternetOptions }),
  new Schema({ name: "Lorem", options: LoremOptions }),
  new Schema({ name: "Person", options: PersonOptions }),
  new Schema({ name: "Phone", options: PhoneOptions }),
  new Schema({ name: "System", options: SystemOptions }),
  new Schema({ name: "Vehicle", options: VehicleOptions }),
  new Schema({ name: "Video", options: VideoOptions }),
  new Schema({ name: "Word", options: WordOptions }),
];
