import { SchemaConfigDTO } from "@modules/api/dto/schemaConfig.dto";

export class GetSchemaObject {
  constructor() {}

  public execute(schemaConfig: SchemaConfigDTO): unknown {
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

  private transformApiSchemaObjectFields(
    schema: ApiSchemaConfigObject,
  ): Array<InputDatasetField> {
    const fields = [] as Array<InputDatasetField>;

    Object.entries(schema).forEach(([name, fieldConfig]) => {
      if (typeof fieldConfig === "string") {
        const schemaParsed = this.resolveFieldSchemaString(name, fieldConfig);

        fields.push({
          id: schemas.id.uuid().getValue(),
          name,
          isArray: null,
          isPosibleNull: 0,
          dataType: { type: DATA_TYPES.SINGLE_VALUE, fieldType: schemaParsed },
        });
      } else {
        if ("schema" in fieldConfig) {
          if (typeof fieldConfig.schema === "string") {
            const schemaParsed = this.resolveFieldSchemaString(
              name,
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
              isArray: fieldConfig.isArray
                ? this.datasetGeneratorService.validateFieldIsArrayLimit(
                    fieldConfig.isArray,
                  )
                : null,
              isPosibleNull: this.datasetGeneratorService.validateIsPosibleNull(
                fieldConfig.isPosibleNull,
              ),
              dataType: {
                type: DATA_TYPES.MIXED,
                object: schemaSubFields,
              },
            });
          }
        } else {
          throw new DefinitionFieldSchemaError(
            `You must provide a schema in the field ${name}`,
          );
        }
      }
    });

    return fields;
  }

  private validateSchemaLimit(limit?: number): number {
    let returnLimit = -1;

    if (typeof limit === "number" && limit >= 0 && limit <= 100) {
      returnLimit = limit;
    }

    return returnLimit;
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

  private resolveFieldSchemaString(fieldName: string, schemaString: string) {
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
        throw new DefinitionFieldSchemaError(
          `Incorrect schema pattern in field '${fieldName}'`,
        );
      }
    } else {
      throw new DefinitionFieldSchemaError(
        `Incorrect schema pattern in field '${fieldName}'`,
      );
    }
  }
}
