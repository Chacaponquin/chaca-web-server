import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Module } from "@nestjs/common";
import { ApiController } from "./controller/api.controller";
import { ApiService } from "./services/api.service";

@Module({
  imports: [SchemaOptionsModule],
  controllers: [ApiController],
  exports: [ApiService],
  providers: [ApiService],
})
export class ApiModule {}
