import { MediaService } from "../services/media.service";
import { Controller, Post } from "@nestjs/common";
import { UploadedFile, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";

@Controller("admin/media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("/uploadImage")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: path.join(__dirname, "../../../../../temp"),
        filename: (req, file, callback) => {
          const filename = file.originalname;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const fileURL = path.join(
      __dirname,
      `../../../../../temp/${file.filename}`,
    );
    const imageResultURL = await this.mediaService.uploadImage(fileURL);

    return imageResultURL;
  }
}
