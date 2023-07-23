import { Controller, Get, Param, Req, Post, Body } from "@nestjs/common";
import { ApiService } from "../services/api.service";
import { SimpleSchemaConfig } from "../dto/schema_config";

@Controller("api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post("/schema")
  public getSchemaByConfig(@Body() schemaConfig: SimpleSchemaConfig) {
    try {
      return this.apiService.getSchemaObject(schemaConfig);
    } catch (error) {
      throw error;
    }
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
