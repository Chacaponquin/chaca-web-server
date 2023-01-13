import { Controller, Get } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import { UtilsService } from "../services/utils.service";

@Controller("util")
export class UtilsController {
  constructor(
    private readonly utilsServices: UtilsService,
    private readonly userService: UserService,
  ) {}

  @Get("/apiOptions")
  getApiOptions() {
    return this.utilsServices.apiOptions();
  }

  @Get("/fileConfig")
  getFileConfig() {
    return this.utilsServices.fileConfig();
  }

  @Get("/faq")
  getFAQ() {
    return this.utilsServices.faq();
  }

  @Get("/noUserLimits")
  getNoUserLimits() {
    return this.userService.noUserLimits();
  }
}
