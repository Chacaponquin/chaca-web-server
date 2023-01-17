import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import {
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";

@Injectable()
export class ApiService {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  getValueBySchemaOption(
    schema: string,
    option: string,
    optionConfig: any,
  ): unknown | Array<unknown> {
    try {
      const foundOption = this.schemaOptionsService.findOption(schema, option);
      return this.schemaOptionsService.generateValueByConfig(
        foundOption,
        optionConfig,
      );
    } catch (error) {
      if (error instanceof this.schemaOptionsService.notFoundSchemaError) {
        throw new HttpException(
          `The schema '${schema}' do not exists`,
          HttpStatus.NOT_FOUND,
        );
      } else if (
        error instanceof this.schemaOptionsService.notFoundOptionError
      ) {
        throw new HttpException(
          `The option '${option}' do not exists in the schema '${schema}'`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
