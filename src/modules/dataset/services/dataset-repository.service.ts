import { Injectable, StreamableFile } from "@nestjs/common";
import { S3Repository } from "../infrastructure/s3/core";

interface DownloadProps {
  key: string;
}

@Injectable()
export class DatasetRepository {
  constructor(private readonly repository: S3Repository) {}

  public async downloadDataset({
    key,
  }: DownloadProps): Promise<StreamableFile> {
    return await this.repository.downloadDataset(key);
  }

  public async uploadDataset({ filePath }: { filePath: string }) {
    return await this.repository.uploadDataset({ filePath: filePath });
  }
}
