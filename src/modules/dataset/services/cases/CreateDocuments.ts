import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ChacaSchemaBuilder } from "./ChacaSchemaBuilder";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";
import { NotExistFieldError } from "chaca";
import { DatasetCreationError } from "@modules/dataset/exceptions";

interface ExecuteProps {
  fields: Array<InputDatasetFieldDTO>;
  count: number;
}

export class CreateDocuments {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  public execute({ count, fields }: ExecuteProps) {
    const builder = new ChacaSchemaBuilder(this.schemaOptionsService);
    const schema = builder.execute(fields);

    try {
      return schema.generate(count);
    } catch (error) {
      if (error instanceof NotExistFieldError) {
        throw new DatasetCreationError(error.message);
      } else {
        throw error;
      }
    }
  }
}
