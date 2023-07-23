import { Module } from "@nestjs/common";
import { MediaController } from "./controller/media.controller";
import { CloudinaryProvider } from "./providers/cloudinary.provider";
import { MediaService } from "./services/media.service";
import { MediaRepository } from "./services/media-repository.service";
import { MediaCloudinaryRepository } from "./insfrastructure/cloudinary/media-cloudinary-repository.service";

@Module({
  imports: [],
  providers: [
    CloudinaryProvider,
    MediaService,
    MediaRepository,
    MediaCloudinaryRepository,
  ],
  exports: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
