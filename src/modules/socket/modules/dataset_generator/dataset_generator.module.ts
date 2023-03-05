import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Module } from "@nestjs/common";
import { DatasetGeneratorService } from "./services/dataset_generator.service";

@Module({
  imports: [SchemaOptionsModule],
  providers: [DatasetGeneratorService],
  exports: [DatasetGeneratorService],
  controllers: [],
})
export class DatasetGeneratorModule {}
