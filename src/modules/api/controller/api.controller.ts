import { Controller, Get, Param, Req, Post, Body } from "@nestjs/common";
import { ApiService } from "../services/api.service";
import { CompleteSchemaConfig, SimpleSchemaConfig } from "../dto/schema_config";
import { Request } from "express";

@Controller("api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post("/schema")
  public schemaByConfig(@Body() schemaConfig: SimpleSchemaConfig) {
    return this.apiService.getSchemaObject(schemaConfig);
  }

  @Post("/schema/array")
  public schemaArrayByConfig(@Body() schemaConfig: CompleteSchemaConfig) {
    return this.apiService.getSchemaArray(schemaConfig);
  }

  @Get("/:schema/:option")
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
