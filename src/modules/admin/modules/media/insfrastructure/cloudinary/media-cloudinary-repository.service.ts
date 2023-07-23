import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class MediaCloudinaryRepository {
  public async uploadImage(imageURL: string): Promise<string> {
    const result = await cloudinary.uploader.upload(imageURL, {
      folder: "chaca",
    });
    return result.url;
  }
}
