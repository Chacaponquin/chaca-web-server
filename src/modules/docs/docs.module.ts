import { Module } from "@nestjs/common";
import { DocsController } from "./controller/docs.controller";
import { DocsService } from "./services/docs.service";
import { LanguageModule } from "@modules/app/modules/language/language.module";

@Module({
  controllers: [DocsController],
  imports: [LanguageModule],
  exports: [DocsService],
  providers: [DocsService],
})
export class DocsModule {}
