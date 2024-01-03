import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import { WebApiService } from "../services/web-api.service";
import { ROUTES } from "@modules/app/constants";

@Controller(ROUTES.WEB_API.ROOT)
export class WebApiController {
  constructor(
    private readonly services: WebApiService,
    private readonly userService: UserService,
  ) {}

  @Get(ROUTES.WEB_API.DOWNLOAD_FILE)
  downloadFile(@Param("file") fileName: string) {
    return this.services.fileToDownload(fileName);
  }

  @Get(ROUTES.WEB_API.SCHEMAS)
  getApiSchemas() {
    return this.services.getApiSchemas();
  }

  @Get(ROUTES.WEB_API.FILE_CONFIG)
  getFileConfig() {
    return this.services.fileConfig();
  }

  @Get(ROUTES.WEB_API.FAQ)
  getFAQ() {
    return this.services.faq();
  }

  @Get(ROUTES.WEB_API.NO_USER_LIMITS)
  getNoUserLimits() {
    return this.userService.noUserLimits();
  }
}
