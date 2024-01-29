import { Module } from "@nestjs/common";
import { MediaService } from "./services/media.service";
import { EnvModule } from "@modules/app/modules/env/env.module";

@Module({
  imports: [EnvModule],
  providers: [MediaService],
  exports: [MediaService],
  controllers: [],
})
export class MediaModule {}
