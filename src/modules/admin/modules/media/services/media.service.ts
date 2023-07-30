import { Injectable } from "@nestjs/common";
import { MediaRepository } from "./media-repository.service";

@Injectable()
export class MediaService {
  constructor(private readonly repository: MediaRepository) {}

  public async uploadImage(imageURL: string): Promise<string> {
    const resultURL = await this.repository.uploadImage(imageURL);
    return resultURL;
  }
}
