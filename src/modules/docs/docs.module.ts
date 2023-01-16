import { Module } from "@nestjs/common";
import { SharedService } from "@shared/services/shared.service";
import { DocsController } from "./controller/docs.controller";
import { DocsService } from "./services/docs.service";

@Module({
  controllers: [DocsController],
  imports: [],
  exports: [],
  providers: [DocsService, SharedService],
})
export class DocsModule {}
