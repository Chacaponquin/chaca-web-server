import { ChacaDatasetError } from "@modules/socket/errors/ChacaDatasetError";
import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { SchemaConfigDTO } from "../dto/schemaConfig.dto";
import { DefinitionFieldSchemaError } from "../exceptions";
import { ApiService } from "../services/api.service";

@Controller("api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post("")
  public getSchemaByConfig(@Body() schemaConfig: SchemaConfigDTO) {
    try {
      return this.apiService.getSchemaObject(schemaConfig);
    } catch (error) {
      if (
        error instanceof DefinitionFieldSchemaError ||
        error instanceof ChacaDatasetError
      ) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new InternalServerErrorException();
      }
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
