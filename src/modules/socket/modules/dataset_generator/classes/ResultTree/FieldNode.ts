export interface FieldNodeProps {
  id: string;
  name: string;
  isPosibleNull: number;
}

export abstract class FieldNode {
  constructor(protected readonly config: FieldNodeProps) {}

  get id() {
    return this.config.id;
  }

  get name() {
    return this.config.name;
  }

  public abstract getValue(): unknown | unknown[];
  public abstract getValueByLocation(location: string[]): unknown | unknown[];
}
