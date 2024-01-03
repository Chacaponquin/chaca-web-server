import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { ChacaSchemaBuilder } from "./ChacaSchemaBuilder";
import { InputDatasetFieldDTO } from "@modules/dataset/dto/dataset";

interface Props {
  fields: Array<InputDatasetFieldDTO>;
  count: number;
}

export class CreateDocuments {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  public execute({ count, fields }: Props) {
    const builder = new ChacaSchemaBuilder(this.schemaOptionsService);
    const schema = builder.execute(fields);

    return schema.genArray(count);
  }
}
