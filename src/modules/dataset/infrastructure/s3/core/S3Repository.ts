import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { Injectable, StreamableFile } from "@nestjs/common";
import { Upload } from "@aws-sdk/lib-storage";
import * as fs from "fs";
import {
  DownloadDatasetException,
  UploadDatasetException,
} from "@modules/dataset/exceptions/dataset";
import { schemas } from "chaca";
import { Readable } from "stream";

interface UploadDatasetProps {
  filePath: string;
}

@Injectable()
export class S3Repository {
  private readonly client = new S3Client({
    credentials: {
      accessKeyId: this.envServices.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: this.envServices.AWS_S3_SECRET_ACCESS_KEY,
    },
    region: this.envServices.AWS_S3_REGION,
  });

  constructor(private readonly envServices: EnvService) {}

  public async downloadDataset(key: string): Promise<StreamableFile> {
    const command = new GetObjectCommand({
      Bucket: this.envServices.AWS_S3_BUCKET,
      Key: key,
    });

    const fileStream = await this.client.send(command);

    if (fileStream.Body) {
      return new StreamableFile(fileStream.Body as Readable);
    } else {
      throw new DownloadDatasetException();
    }
  }

  public async uploadDataset({
    filePath,
  }: UploadDatasetProps): Promise<string> {
    const fileStream = fs.createReadStream(filePath);

    const key = schemas.id.uuid().getValue();

    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: this.envServices.AWS_S3_BUCKET,
        Key: key,
        Body: fileStream,
      },
    });

    try {
      await upload.done();
      return key;
    } catch (error) {
      throw new UploadDatasetException();
    }
  }
}
