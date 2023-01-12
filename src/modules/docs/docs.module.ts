import { Module } from "@nestjs/common";
import { DocsController } from "./controller/docs.controller";
import { DocsService } from "./services/docs.service";

@Module({
  controllers: [DocsController],
  imports: [],
  exports: [],
  providers: [DocsService],
})
export class DocsModule {}
