import { InvalidUserPasswordException } from "../exceptions";

export class UserPassword {
  private _password: string;

  constructor(password: string) {
    if (password.trim() === "") {
      throw new InvalidUserPasswordException();
    }

    this._password = password;
  }

  public get value() {
    return this._password;
  }
}
