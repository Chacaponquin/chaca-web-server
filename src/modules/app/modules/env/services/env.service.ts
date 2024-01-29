import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  public get SECRET_WORD() {
    return this.configService.get<string>("SECRET_WORD");
  }

  public get TOKEN_EXPIRES_TIME() {
    return this.configService.get<string>("CURRENT_USER_TOKEN_EXPIRES");
  }

  public get SERVER_URL() {
    return this.configService.get<string>("SERVER_URL");
  }

  public get GITHUB_CLIENT_ID() {
    return this.configService.get<string>("GITHUB_CLIENT_ID");
  }

  public get GITHUB_CLIENT_SECRET() {
    return this.configService.get<string>("GITHUB_CLIENT_SECRET");
  }

  public get GOOGLE_CLIENT_ID() {
    return this.configService.get<string>("GOOGLE_CLIENT_ID");
  }

  public get GOOGLE_CLIENT_SECRET() {
    return this.configService.get<string>("GOOGLE_CLIENT_SECRET");
  }

  public get CLAUDINARY_API_KEY() {
    return this.configService.get<string>("CLAUDINARY_API_KEY");
  }

  public get CLAUDINARY_API_SECRET() {
    return this.configService.get<string>("CLAUDINARY_API_SECRET");
  }

  public get CLIENT_REDIRECT_URL() {
    return this.configService.get<string>("CLIENT_REDIRECT_URL") as string;
  }

  public get AWS_S3_ACCESS_KEY_ID() {
    return this.configService.get<string>("AWS_ACCESS_KEY_ID") as string;
  }

  public get AWS_S3_SECRET_ACCESS_KEY() {
    return this.configService.get<string>("AWS_SECRET_ACCESS_KEY") as string;
  }

  public get AWS_S3_REGION() {
    return this.configService.get<string>("S3_REGION") as string;
  }

  public get AWS_S3_BUCKET() {
    return this.configService.get<string>("S3_BUCKET") as string;
  }
}
