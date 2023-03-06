import {
  NotFoundOptionError,
  NotFoundSchemaError,
} from "@modules/schema-options/errors";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { DATA_TYPES } from "@modules/socket/constants/DATA_TYPE.enum";
import {
  InputDataset,
  InputDatasetField,
} from "@modules/socket/dto/datasetsDTO.dto";
import { DatasetGeneratorService } from "@modules/socket/modules/dataset_generator/services/dataset_generator.service";
import {
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import { schemas } from "chaca";
import {
  ApiSchemaConfigCompleteObject,
  ApiSchemaConfigObject,
  SchemaConfigDTO,
} from "../dto/schemaConfig.dto";
import { DefinitionFieldSchemaError } from "../errors";

@Injectable()
export class ApiService {
  constructor(
    private readonly schemaOptionsService: SchemaOptionsService,
    private readonly datasetGeneratorService: DatasetGeneratorService,
  ) {}

  public getApiSchemaObject(schemaConfig: SchemaConfigDTO): unknown {
    const inputDataset = this.transformApiSchemaObjectToDataset(schemaConfig);

    const data = this.datasetGeneratorService.createDataset(inputDataset);

    if (inputDataset.limit === -1) {
      return data[0];
    } else {
      return data;
    }
  }

  private transformApiSchemaObjectToDataset(
    schemaConfig: SchemaConfigDTO,
  ): InputDataset {
    if ("schema" in schemaConfig) {
      const config = schemaConfig as ApiSchemaConfigCompleteObject;
      const limit = this.validateSchemaLimit(config.limit);

      return {
        id: schemas.id.uuid().getValue(),
        limit,
        fields: this.transformApiSchemaObjectFields(config.schema),
        name: schemas.id.mongodbID().getValue(),
      };
    } else {
      return {
        id: schemas.id.uuid().getValue(),
        limit: -1,
        fields: this.transformApiSchemaObjectFields(schemaConfig),
        name: schemas.id.mongodbID().getValue(),
      };
    }
  }

  private validateSchemaLimit(limit?: number): number {
    let returnLimit = -1;

    if (typeof limit === "number" && limit >= 0 && limit <= 100) {
      returnLimit = limit;
    }

    return returnLimit;
  }

  private transformApiSchemaObjectFields(
    schema: ApiSchemaConfigObject,
  ): Array<InputDatasetField> {
    const fields = [] as Array<InputDatasetField>;

    Object.entries(schema).forEach(([name, fieldConfig]) => {
      if (typeof fieldConfig === "string") {
        const schemaParsed = this.resolveFieldSchemaString(fieldConfig);

        fields.push({
          id: schemas.id.uuid().getValue(),
          name,
          isArray: null,
          isPosibleNull: 0,
          dataType: { type: DATA_TYPES.SINGLE_VALUE, fieldType: schemaParsed },
        });
      } else {
        if (typeof fieldConfig.schema === "string") {
          const schemaParsed = this.resolveFieldSchemaString(
            fieldConfig.schema,
          );

          fields.push({
            id: schemas.id.uuid().getValue(),
            name,
            isArray: null,
            isPosibleNull: 0,
            dataType: {
              type: DATA_TYPES.SINGLE_VALUE,
              fieldType: schemaParsed,
            },
          });
        } else {
          const schemaSubFields = this.transformApiSchemaObjectFields(
            fieldConfig.schema,
          );

          fields.push({
            id: schemas.id.uuid().getValue(),
            name,
            isArray: null,
            isPosibleNull: 0,
            dataType: {
              type: DATA_TYPES.MIXED,
              object: schemaSubFields,
            },
          });
        }
      }
    });

    return fields;
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
    const initSchemaDefinitionPos = schemaString.indexOf("{{");
    const finishSchemaDefinitionPos = schemaString.indexOf("}}");

    if (initSchemaDefinitionPos !== -1 && finishSchemaDefinitionPos !== -1) {
      const separatedSchema = schemaString
        .slice(initSchemaDefinitionPos + 2, finishSchemaDefinitionPos)
        .split("/");

      if (separatedSchema.length === 2) {
        const parent = separatedSchema[0];
        const option = separatedSchema[1];

        const argsString = schemaString.slice(finishSchemaDefinitionPos + 2);
        const args = this.getArgsFromString(argsString);

        return { parent, args, type: option };
      } else {
        throw new DefinitionFieldSchemaError();
      }
    } else {
      throw new DefinitionFieldSchemaError();
    }
  }

  public getValueBySchemaOption(
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
