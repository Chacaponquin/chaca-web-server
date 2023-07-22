import { Module } from "@nestjs/common";
import { LanguageService } from "@shared/services/language.service";
import { DocsController } from "./controller/docs.controller";
import { DocsService } from "./services/docs.service";
import { DocsRepository } from "./services/docs-repository.service";

@Module({
  controllers: [DocsController],
  imports: [],
  exports: [DocsService],
  providers: [DocsService, LanguageService, DocsRepository],
})
export class DocsModule {}
