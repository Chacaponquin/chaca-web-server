import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { FileConfigDTO } from "@modules/dataset/dto/file";

export interface CreateDatasetDTO {
  datasets: Array<InputDatasetDTO>;
  config: FileConfigDTO;
}
