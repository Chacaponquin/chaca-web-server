import { Controller, Get, Param, Req, Post, Body } from "@nestjs/common";
import { SchemaConfigDTO } from "../dto/schemaConfig.dto";
import { ApiService } from "../services/api.service";

@Controller("api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post("")
  getSchemaByConfig(@Body() schemaConfig: SchemaConfigDTO) {
    return this.apiService.getApiSchemaObject(schemaConfig);
  }

  @Get("/:schema/:option")
  valueBySchema(
    @Param("schema") schema: string,
    @Param("option") option: string,
    @Req() req: any,
  ): unknown {
    return this.apiService.getValueBySchemaOption(schema, option, req.query);
  }
}
