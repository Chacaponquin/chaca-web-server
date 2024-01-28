import { Module } from "@nestjs/common";
import { MediaService } from "./services/media.service";
import { MediaRepository } from "./services/media-repository.service";
import { MediaCloudinaryRepository } from "./insfrastructure/cloudinary/media-cloudinary-repository.service";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { v2 } from "cloudinary";
import { EnvModule } from "@modules/app/modules/env/env.module";

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: "Cloudinary",
      inject: [EnvService],
      useFactory(envService: EnvService) {
        return v2.config({
          cloud_name: "chaca-sa",
          api_key: envService.CLAUDINARY_API_KEY,
          api_secret: envService.CLAUDINARY_API_SECRET,
        });
      },
    },
    MediaService,
    MediaRepository,
    MediaCloudinaryRepository,
  ],
  exports: [MediaService],
  controllers: [],
})
export class MediaModule {}
