import { Module } from "@nestjs/common";
import { SharedService } from "@shared/services/language.service";
import { SchemaOptionsService } from "./services/schema-options.service";

@Module({
  imports: [],
  controllers: [],
  exports: [SchemaOptionsService],
  providers: [SchemaOptionsService, SharedService],
})
export class SchemaOptionsModule {}
