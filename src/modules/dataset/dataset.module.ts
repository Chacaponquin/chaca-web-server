import { Module } from "@nestjs/common";
import { DatasetService } from "./services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";

@Module({
  imports: [SchemaOptionsModule],
  controllers: [],
  exports: [],
  providers: [DatasetService],
})
export class DatasetModule {}
