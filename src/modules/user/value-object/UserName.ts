import { InvalidUsernameException } from "../exceptions";

export class UserName {
  private _name: string;

  constructor(name: string) {
    if (name.trim() === "") {
      throw new InvalidUsernameException(`The username can not be empty`);
    }

    this._name = name.trim();
  }

  public get value() {
    return this._name;
  }
}
