import { InvalidUserEmailException } from "../exceptions";

export class UserEmail {
  private _email: string;

  public static readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(email: string) {
    this.validateNotEmpty(email);
    this.validateRegExp(email);
    this._email = email;
  }

  private validateNotEmpty(email: string): void {
    if (email.trim() === "") {
      throw new InvalidUserEmailException();
    }
  }

  private validateRegExp(email: string): void {
    const isValid = UserEmail.emailRegex.test(email);

    if (!isValid) {
      throw new InvalidUserEmailException();
    }
  }

  public get value() {
    return this._email;
  }
}
