import { Module } from "@nestjs/common";
import { DatasetService } from "./services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { S3Repository } from "./infrastructure/s3/core";
import { EnvModule } from "@modules/app/modules/env/env.module";

@Module({
  imports: [SchemaOptionsModule, EnvModule],
  controllers: [],
  exports: [DatasetService],
  providers: [DatasetService, S3Repository],
})
export class DatasetModule {}
