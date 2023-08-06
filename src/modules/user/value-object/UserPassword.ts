import { InvalidUserPasswordException } from "../exceptions";

export class UserPassword {
  private _password: string;

  constructor(password: string) {
    if (password.trim() === "") {
      throw new InvalidUserPasswordException(`The password can not be empty`);
    }

    this._password = password;
  }

  public get value() {
    return this._password;
  }
}
