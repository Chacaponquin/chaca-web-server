import { InvalidUserMessageTitleException } from "@modules/user-message/exceptions";

export class UserMessageTitle {
  private _name: string;

  constructor(name: string) {
    if (name.trim() === "") {
      throw new InvalidUserMessageTitleException();
    }
  }

  public get value() {
    return this._name;
  }
}
