import { Module } from "@nestjs/common";
import { LanguageService } from "./services/language.service";

@Module({
  imports: [],
  controllers: [],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
