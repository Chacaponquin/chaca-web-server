import { Module } from "@nestjs/common";
import { SchemaOptionsService } from "./services/schema-options.service";
import { SchemaOptionsRepository } from "./services/schema-options-repository.service";
import { LanguageModule } from "@modules/app/modules/language/language.module";

@Module({
  imports: [LanguageModule],
  controllers: [],
  exports: [SchemaOptionsService],
  providers: [SchemaOptionsRepository, SchemaOptionsService],
})
export class SchemaOptionsModule {}
