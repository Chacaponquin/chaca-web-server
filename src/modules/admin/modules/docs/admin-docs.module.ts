import { DocsModule } from "@modules/docs/docs.module";
import { Module } from "@nestjs/common";
import { AdminDocsController } from "./controller/admin-docs.controller";

@Module({
  imports: [DocsModule],
  controllers: [AdminDocsController],
  exports: [],
  providers: [],
})
export class AdminDocsModule {}
