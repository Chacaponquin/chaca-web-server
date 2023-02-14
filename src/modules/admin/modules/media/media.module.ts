import { Module } from "@nestjs/common";
import { MediaController } from "./controller/media.controller";
import { CloudinaryProvider } from "./providers/cloudinary.provider";
import { MediaService } from "./services/media.service";

@Module({
  imports: [],
  providers: [CloudinaryProvider, MediaService],
  exports: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
