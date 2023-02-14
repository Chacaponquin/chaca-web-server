import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class MediaService {
  async uploadImage(fileURL: string): Promise<string> {
    const result = await cloudinary.uploader.upload(fileURL, {
      folder: "chaca",
    });
    return result.url;
  }
}
