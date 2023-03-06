import { chaca } from "chaca";

export interface FieldNodeProps {
  id: string;
  name: string;
  isPosibleNull: number;
}

export abstract class FieldNode {
  public isNull: boolean;

  constructor(protected readonly config: FieldNodeProps) {
    this.isNull = this.nullPosibility();
  }

  get id() {
    return this.config.id;
  }

  get name() {
    return this.config.name;
  }

  protected abstract getValue(): unknown | unknown[];
  public abstract getValueByLocation(location: string[]): unknown | unknown[];

  public getNodeValue() {
    return this.isNull ? null : this.getValue();
  }

  private nullPosibility(): boolean {
    const arrayValues = [] as Array<boolean>;

    let posibleNull = this.config.isPosibleNull;

    for (let i = 0; i < 100; i++) {
      if (posibleNull > 0) {
        arrayValues.push(true);
        posibleNull--;
      } else {
        arrayValues.push(false);
      }
    }

    return chaca.utils.oneOfArray(arrayValues);
  }
}
