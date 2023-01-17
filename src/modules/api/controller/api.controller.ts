import { Controller, Get, Param, Req } from "@nestjs/common";
import { ApiService } from "../services/api.service";

@Controller("api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get("/:schema/:option")
  valueBySchema(
    @Param("schema") schema: string,
    @Param("option") option: string,
    @Req() req: any,
  ): unknown {
    return this.apiService.getValueBySchemaOption(schema, option, req.query);
  }
}
