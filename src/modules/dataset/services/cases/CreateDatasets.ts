import { InputDatasetDTO } from "@modules/dataset/dto/dataset";
import { BuildSchemas } from "./BuildSchemas";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

export class CreateDatasets {
  private builder = new BuildSchemas(this.schemaOptionsService);

  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  public execute(datasetsConfig: Array<InputDatasetDTO>) {
    const multi = this.builder.execute(datasetsConfig);
    return multi.generate();
  }
}
