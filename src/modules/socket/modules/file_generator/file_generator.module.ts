import { Module } from "@nestjs/common";
import { FileGeneratorService } from "./services/file_generator.service";

@Module({
  imports: [],
  controllers: [],
  providers: [FileGeneratorService],
  exports: [],
})
export class FileGeneratorModule {}
