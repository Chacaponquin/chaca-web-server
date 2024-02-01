import { Module } from "@nestjs/common";
import { DatasetService } from "./services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { S3Repository } from "./infrastructure/s3/core";
import { EnvModule } from "@modules/app/modules/env/env.module";
import { DatasetRepository } from "./services/dataset-repository.service";

@Module({
  imports: [SchemaOptionsModule, EnvModule],
  controllers: [],
  exports: [DatasetService],
  providers: [DatasetService, S3Repository, DatasetRepository],
})
export class DatasetModule {}
