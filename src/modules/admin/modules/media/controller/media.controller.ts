import { MediaService } from "../services/media.service";
import { Controller, Post } from "@nestjs/common";
import { UploadedFile, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";

@Controller("admin/media")
export class MediaController {
  private readonly TEMP_FOLDER_DIR = path.join(
    __dirname,
    "../../../../../temp",
  );

  constructor(private readonly mediaService: MediaService) {}

  @Post("/upload-image")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: path.join(__dirname, "../../../../../temp"),
        filename: (_, file, callback) => {
          const filename = file.originalname;
          callback(null, filename);
        },
      }),
    }),
  )
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const imageURL = path.join(this.TEMP_FOLDER_DIR, `/${file.filename}`);
    const imageResultURL = await this.mediaService.uploadImage(imageURL);

    return imageResultURL;
  }
}
