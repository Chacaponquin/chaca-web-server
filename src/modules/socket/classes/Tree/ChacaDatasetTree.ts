import { ApiSchema } from "@modules/schema-options/interfaces/options.interface";
import { InputDatasetField } from "../../dto/datasetsDTO.dto";
import { RootNode } from "./RootNode";

export class ChacaDatasetTree {
  private root: RootNode;

  constructor(id: string, name: string, limit: number) {
    this.root = new RootNode(id, name, limit);
  }

  get id() {
    return this.root.id;
  }

  get limit() {
    return this.root.limit;
  }

  get name() {
    return this.root.name;
  }

  get fields() {
    return this.root.nodes;
  }

  public insertDatasetsFields(
    fields: InputDatasetField[],
    schemas: Array<ApiSchema>,
  ) {
    this.root.insertDatasetsFields(fields, schemas);
  }
}
