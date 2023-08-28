import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import { WebApiService } from "../services/web-api.service";

@Controller("web_api")
export class WebApiController {
  constructor(
    private readonly services: WebApiService,
    private readonly userService: UserService,
  ) {}

  @Get("/downloadData/:file")
  downloadFile(@Param("file") fileName: string) {
    return this.services.fileToDownload(fileName);
  }

  @Get("/schemas")
  getApiSchemas() {
    return this.services.getApiSchemas();
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
