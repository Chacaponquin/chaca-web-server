import {
  Controller,
  Get,
  Headers,
  Param,
  StreamableFile,
} from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import { UtilsService } from "../services/utils.service";
import * as path from "path";
import * as fs from "fs";

@Controller("util")
export class UtilsController {
  constructor(
    private readonly utilsServices: UtilsService,
    private readonly userService: UserService,
  ) {}

  @Get("/downloadData/:file")
  downloadFile(@Param("file") fileName: string) {
    const file = fs.createReadStream(
      path.join(__dirname, "../../../data", fileName),
    );
    return new StreamableFile(file);
  }

  @Get("/apiOptions")
  getApiOptions(@Headers("language") language: string) {
    return this.utilsServices.apiOptions(language);
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
