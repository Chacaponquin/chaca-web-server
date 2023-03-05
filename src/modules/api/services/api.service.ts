import {
  NotFoundOptionError,
  NotFoundSchemaError,
} from "@modules/schema-options/errors";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { DatasetGeneratorService } from "@modules/socket/modules/dataset_generator/services/dataset_generator.service";
import {
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  ApiCompleteConfigFieldSchema,
  ApiFieldConfig,
} from "../dto/fieldConfig.dto";
import {
  ApiSchemaConfigCompleteObject,
  ApiSchemaConfigSimpleObject,
  SchemaConfigDTO,
} from "../dto/schemaConfig.dto";
import { DefinitionFieldSchemaError } from "../errors";

@Injectable()
export class ApiService {
  constructor(
    private readonly schemaOptionsService: SchemaOptionsService,
    private readonly datasetGeneratorService: DatasetGeneratorService,
  ) {}

  getApiSchemaObject(schemaConfig: SchemaConfigDTO): unknown {
    let schema: ApiSchemaConfigSimpleObject;
    let limit = 0;

    if ("schema" in schemaConfig) {
      const config = schemaConfig as ApiSchemaConfigCompleteObject;
      schema = config.schema;
      limit = this.validateSchemaLimit(config.limit);
    } else {
      limit = 0;
      schema = schemaConfig;
    }

    if (limit === 0) {
      const returnObject = this.resolveApiSchema(schema);
      return returnObject;
    } else {
      const returnArray = [] as Array<unknown>;

      for (let i = 0; i < limit; i++) {
        returnArray.push(this.resolveApiSchema(schema));
      }

      return returnArray;
    }
  }

  private getArgsFromString(argsString: string) {
    let args = {};

    const separatedArgs = argsString.split(";");

    separatedArgs.forEach((ar) => {
      const valueString = ar.split("=");

      if (valueString.length === 2) {
        const key = valueString[0];
        const value = valueString[1];

        args = { ...args, [key]: this.validateStringValue(value) };
      }
    });

    return args;
  }

  private resolveFieldSchemaString(schemaString: string) {
    const initSchemaDefinitionPos = schemaString.indexOf("}}");
    const finishSchemaDefinitionPos = schemaString.indexOf("}}");

    if (initSchemaDefinitionPos !== -1 && finishSchemaDefinitionPos !== -1) {
      const separatedSchema = schemaString
        .slice(initSchemaDefinitionPos + 2, finishSchemaDefinitionPos)
        .split(".");

      if (separatedSchema.length === 2) {
        const parent = separatedSchema[0];
        const option = separatedSchema[1];

        try {
          const foundOption = this.schemaOptionsService.findOption(
            parent,
            option,
          );

          const argsString = schemaString.slice(finishSchemaDefinitionPos + 2);
          const args = this.getArgsFromString(argsString);

          return foundOption.getValue(args);
        } catch (error) {
          if (error instanceof NotFoundSchemaError) {
            throw new DefinitionFieldSchemaError(
              `The schema ${parent} do not exists`,
            );
          } else if (error instanceof NotFoundOptionError) {
            throw new DefinitionFieldSchemaError(
              `The option ${option} do not exists in schema ${parent}`,
            );
          } else {
            throw new DefinitionFieldSchemaError();
          }
        }
      } else {
        throw new DefinitionFieldSchemaError();
      }
    } else {
      throw new DefinitionFieldSchemaError();
    }
  }

  private resolveApiSchema(schema: ApiSchemaConfigSimpleObject): unknown {
    let returnObject = {};

    Object.entries(schema).forEach(([key, schemaConfig]) => {
      if (typeof schemaConfig === "string") {
        returnObject = {
          ...returnObject,
          [key]: this.resolveFieldSchemaString(schemaConfig),
        };
      } else {
        this.resolveSchemaFieldByConfig(schemaConfig);
      }
    });

    return returnObject;
  }

  private resolveSchemaFieldByConfig(
    schemaConfig: ApiCompleteConfigFieldSchema,
  ) {
    let retValue = this.resolveFieldSchemaString(schemaConfig.schema);

    if (schemaConfig.isArray) {
      const limit = this.datasetGeneratorService.validateFieldIsArrayLimit(
        schemaConfig.isArray,
      );

      for (let i = 0; i < limit; i++) {}
    }

    if (schemaConfig.posibleNull) {
      if (
        this.datasetGeneratorService.nullPosibility(schemaConfig.posibleNull)
      ) {
        retValue = null;
      } else {
      }
    }
  }

  getValueBySchemaOption(
    schema: string,
    option: string,
    optionConfig: any,
  ): unknown | Array<unknown> {
    try {
      const foundOption = this.schemaOptionsService.findOption(schema, option);

      const returnValue = this.schemaOptionsService.generateValueByConfig(
        foundOption,
        this.generateOptionConfig(optionConfig),
      );

      return returnValue;
    } catch (error) {
      if (error instanceof NotFoundSchemaError) {
        throw new HttpException(
          `The schema '${schema}' do not exists`,
          HttpStatus.NOT_FOUND,
        );
      } else if (error instanceof NotFoundOptionError) {
        throw new HttpException(
          `The option '${option}' do not exists in the schema '${schema}'`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private validateSchemaLimit(limit?: number): number {
    let returnLimit = 0;

    if (typeof limit === "number" && limit >= 0 && limit <= 100) {
      returnLimit = limit;
    }

    return returnLimit;
  }

  private generateOptionConfig(config: any) {
    let retObject = {};

    for (const [key, value] of Object.entries<string>(config)) {
      const configValue: unknown = this.validateStringValue(value);

      retObject = { ...retObject, [key]: configValue };
    }

    return retObject;
  }

  private validateStringValue(value: string): unknown {
    let returnValue: unknown = value;

    if (value === "true") {
      returnValue = "true";
    } else if (value === "false") {
      returnValue = "false";
    } else if (
      typeof Number(value) === "number" &&
      !Number.isNaN(Number(value))
    ) {
      returnValue = Number(value);
    }

    return returnValue;
  }
}
