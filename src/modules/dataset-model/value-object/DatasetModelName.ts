import { InvalidModelNameException } from "../exceptions";

export class DatasetModelName {
  private _value: string;

  constructor(name: string) {
    if (name.trim() === "") {
      throw new InvalidModelNameException(name);
    }

    this._value = name;
  }

  public get value(): string {
    return this._value;
  }
}
