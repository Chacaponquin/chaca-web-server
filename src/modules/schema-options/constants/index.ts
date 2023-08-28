import { Schema } from "../domain";
import { AddressOptions } from "./Address/Address";
import { AnimalOptions } from "./Animal/Animal";
import { DataTypeOptions } from "./DataType/DataType";
import { DateOptions } from "./Date/Date";
import { FinanceOptions } from "./Finance/Finance";
import { IdOptions } from "./Id/Id";
import { ImageOptions } from "./Image/Image";
import { InternetOptions } from "./Internet/Internet";
import { LoremOptions } from "./Lorem/Lorem";
import { PersonOptions } from "./Person/Person";
import { PhoneOptions } from "./Phone/Phone";
import { SystemOptions } from "./System/System";
import { VehicleOptions } from "./Vehicle/Vehicle";
import { VideoOptions } from "./Video/Video";
import { WordOptions } from "./Word/Word";

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
