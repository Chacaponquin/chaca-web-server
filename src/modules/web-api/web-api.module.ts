import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { WebApiController } from "./controller/web-api.controller";
import { WebApiService } from "./services/web-api.service";

@Module({
  imports: [UserModule, SchemaOptionsModule],
  controllers: [WebApiController],
  providers: [WebApiService],
})
export class WebApiModule {}
