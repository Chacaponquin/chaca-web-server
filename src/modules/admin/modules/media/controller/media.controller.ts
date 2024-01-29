import { Controller } from "@nestjs/common";
import * as path from "path";

@Controller("admin/media")
export class MediaController {
  private readonly TEMP_FOLDER_DIR = path.join(
    __dirname,
    "../../../../../temp",
  );

  /* @Post("/upload-image")
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
   
  }*/
}
