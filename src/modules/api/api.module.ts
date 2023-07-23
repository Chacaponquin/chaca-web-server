import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Module } from "@nestjs/common";
import { ApiController } from "./controller/api.controller";
import { ApiService } from "./services/api.service";
import { DatasetModule } from "@modules/dataset/dataset.module";

@Module({
  imports: [DatasetModule, SchemaOptionsModule],
  controllers: [ApiController],
  exports: [ApiService],
  providers: [ApiService],
})
export class ApiModule {}
