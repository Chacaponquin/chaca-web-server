import { InvalidusernameException } from "../exceptions";

export class Username {
  private _name: string;

  constructor(name: string) {
    if (name.trim() === "") {
      throw new InvalidusernameException(`The username can not be empty`);
    }

    this._name = name.trim();
  }

  public get value() {
    return this._name;
  }
}
