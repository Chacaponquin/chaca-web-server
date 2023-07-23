import { Injectable } from "@nestjs/common";
import { MediaCloudinaryRepository } from "../insfrastructure/cloudinary/media-cloudinary-repository.service";

@Injectable()
export class MediaRepository {
  constructor(
    private readonly cloudinaryRepository: MediaCloudinaryRepository,
  ) {}

  public async uploadImage(imageURL: string): Promise<string> {
    const resultURL = await this.cloudinaryRepository.uploadImage(imageURL);
    return resultURL;
  }
}
