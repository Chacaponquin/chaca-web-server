import { InvalidUserMessageUserEmailException } from "../exceptions";

export class UserMessageUserEmail {
  private _email: string;

  public static readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(email: string) {
    this.validateNotEmpty(email);
    this.validateRegExp(email);
    this._email = email;
  }

  private validateNotEmpty(email: string): void {
    if (email.trim() === "") {
      throw new InvalidUserMessageUserEmailException();
    }
  }

  private validateRegExp(email: string): void {
    const isValid = UserMessageUserEmail.emailRegex.test(email);

    if (!isValid) {
      throw new InvalidUserMessageUserEmailException();
    }
  }

  public get value() {
    return this._email;
  }
}
