import { Controller, Get, Param, Req, Post, Body } from "@nestjs/common";
import { ApiService } from "../services/api.service";
import { CompleteSchemaConfig, SimpleSchemaConfig } from "../dto/schema_config";
import { Request } from "express";
import { ROUTES } from "@modules/app/constants";

@Controller(ROUTES.API.ROOT)
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post(ROUTES.API.SCHEMA)
  public schemaByConfig(@Body() schemaConfig: SimpleSchemaConfig) {
    return this.apiService.getSchemaObject(schemaConfig);
  }

  @Post(ROUTES.API.SCHEMA_ARRAY)
  public schemaArrayByConfig(@Body() schemaConfig: CompleteSchemaConfig) {
    return this.apiService.getSchemaArray(schemaConfig);
  }

  @Get(ROUTES.API.MODULE_OPTION)
  public valueBySchema(
    @Param("schema") schema: string,
    @Param("option") option: string,
    @Req() req: Request,
  ): unknown {
    const value = this.apiService.getValueBySchemaOption({
      schema,
      option,
      optionConfig: req.query,
    });

    return value;
  }
}
