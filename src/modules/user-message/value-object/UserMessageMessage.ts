import { InvalidUserMessageMessageException } from "@modules/user-message/exceptions";

export class UserMessageMessage {
  private _message: string;

  constructor(message: string) {
    if (message.trim() === "") {
      throw new InvalidUserMessageMessageException(
        `The message can not be empty`,
      );
    }

    this._message = message;
  }

  public get value() {
    return this._message;
  }
}
