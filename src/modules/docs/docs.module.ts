import { Module } from "@nestjs/common";
import { DocsController } from "./controller/docs.controller";
import { DocsService } from "./services/docs.service";
import { DocsRepository } from "./services/docs-repository.service";
import { LanguageModule } from "@modules/app/modules/language/language.module";

@Module({
  controllers: [DocsController],
  imports: [LanguageModule],
  exports: [DocsService],
  providers: [DocsService, DocsRepository],
})
export class DocsModule {}
