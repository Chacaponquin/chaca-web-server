import { Module } from "@nestjs/common";
import { SchemaOptionsService } from "./services/schema-options.service";
import { LanguageService } from "@shared/services/language.service";
import { SchemaOptionsRepository } from "./services/schema-options-repository.service";

@Module({
  imports: [],
  controllers: [],
  exports: [SchemaOptionsService],
  providers: [LanguageService, SchemaOptionsRepository, SchemaOptionsService],
})
export class SchemaOptionsModule {}
