import { InputConfig } from "./configDTO.dto";
import { InputDataset } from "./datasetsDTO.dto";

export interface CreateDatasetDTO {
  datasets: InputDataset[];
  config: InputConfig;
}
