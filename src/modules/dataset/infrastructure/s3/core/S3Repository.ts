import { S3Client } from "@aws-sdk/client-s3";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { Injectable } from "@nestjs/common";
import { Upload } from "@aws-sdk/lib-storage";
import * as fs from "fs";
import { UploadDatasetException } from "@modules/dataset/exceptions/dataset";

interface UploadDatasetProps {
  filePath: string;
}

@Injectable()
export class S3Repository {
  constructor(private readonly envServices: EnvService) {}

  public async uploadDataset({ filePath }: UploadDatasetProps): Promise<void> {
    const fileStream = fs.createReadStream(filePath);

    const {
      AWS_S3_BUCKET,
      AWS_S3_ACCESS_KEY_ID,
      AWS_S3_REGION,
      AWS_S3_SECRET_ACCESS_KEY,
    } = this.envServices;

    const uploadParams = {
      Bucket: AWS_S3_BUCKET,
      Key: filePath,
      Body: fileStream,
    };

    const client = new S3Client({
      credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
      },
      region: AWS_S3_REGION,
    });

    const upload = new Upload({
      client: client,
      params: uploadParams,
    });

    try {
      const result = await upload.done();
      console.log(result);
    } catch (error) {
      throw new UploadDatasetException();
    }
  }
}
