import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { UtilsController } from "./controller/utils.controller";
import { UtilsService } from "./services/utils.service";

@Module({
  imports: [UserModule, SchemaOptionsModule],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
