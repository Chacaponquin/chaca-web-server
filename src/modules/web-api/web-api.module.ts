import { SchemaOptionsModule } from "../schema-options/schema-options.module";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { WebApiController } from "./controller/web-api.controller";
import { WebApiService } from "./services/web-api.service";
import { DatasetModule } from "@modules/dataset/dataset.module";

@Module({
  imports: [UserModule, SchemaOptionsModule, DatasetModule],
  controllers: [WebApiController],
  providers: [WebApiService],
})
export class WebApiModule {}
