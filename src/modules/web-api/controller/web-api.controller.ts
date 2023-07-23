import {
  Controller,
  Get,
  Headers,
  Param,
  StreamableFile,
} from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import { WebApiService } from "../services/web-api.service";
import * as path from "path";
import * as fs from "fs";

@Controller("web_api")
export class WebApiController {
  constructor(
    private readonly services: WebApiService,
    private readonly userService: UserService,
  ) {}

  @Get("/downloadData/:file")
  downloadFile(@Param("file") fileName: string) {
    const file = fs.createReadStream(
      path.join(__dirname, "../../../data", fileName),
    );
    return new StreamableFile(file);
  }

  @Get("/schemas")
  getApiSchemas(@Headers("language") language: string) {
    return this.services.getApiSchemas(language);
  }

  @Get("/fileConfig")
  getFileConfig() {
    return this.services.fileConfig();
  }

  @Get("/faq")
  getFAQ() {
    return this.services.faq();
  }

  @Get("/noUserLimits")
  getNoUserLimits() {
    return this.userService.noUserLimits();
  }
}
