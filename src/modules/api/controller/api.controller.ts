import { Controller, Get, Param, Req, Post, Body } from "@nestjs/common";
import { CompleteSchemaConfig, SimpleSchemaConfig } from "../dto/schema_config";
import { Request } from "express";
import { ROUTES } from "@modules/app/constants";
import {
  GetSchemaArray,
  GetSchemaObject,
  GetValueBySchemaOption,
} from "../use-cases";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";

@Controller(ROUTES.API.ROOT)
export class ApiController {
  constructor(
    private readonly datasetServices: DatasetService,
    private readonly schemaOptionsServices: SchemaOptionsService,
  ) {}

  @Post(ROUTES.API.SCHEMA)
  public schemaByConfig(@Body() schemaConfig: SimpleSchemaConfig) {
    const useCase = new GetSchemaObject(this.datasetServices);
    return useCase.execute(schemaConfig);
  }

  @Post(ROUTES.API.SCHEMA_ARRAY)
  public schemaArrayByConfig(@Body() schemaConfig: CompleteSchemaConfig) {
    const useCase = new GetSchemaArray(this.datasetServices);
    return useCase.execute(schemaConfig);
  }

  @Get(ROUTES.API.MODULE_OPTION)
  public valueBySchema(
    @Param("schema") schema: string,
    @Param("option") option: string,
    @Req() req: Request,
  ): unknown {
    const useCase = new GetValueBySchemaOption(this.schemaOptionsServices);

    return useCase.execute({
      option: option,
      schema: schema,
      optionConfig: req.query,
    });
  }
}
