import { Module } from "@nestjs/common";
import { SchemaOptionsService } from "./services/schema-options.service";
import { SchemaOptionsRepository } from "./services/schema-options-repository.service";
import { LanguageModule } from "@modules/app/modules/language/language.module";
import { SchemaOptionsController } from "./controller/schema-options.controller";

@Module({
  imports: [LanguageModule],
  controllers: [SchemaOptionsController],
  exports: [SchemaOptionsService],
  providers: [SchemaOptionsRepository, SchemaOptionsService],
})
export class SchemaOptionsModule {}
