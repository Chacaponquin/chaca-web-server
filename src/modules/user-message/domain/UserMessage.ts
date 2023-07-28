import {
  UserMessageMessage,
  UserMessageTitle,
  UserMessageUserEmail,
} from "../value-object";

export type UserMessageParams = {
  id: string;
  name: string;
  userEmail: string;
  message: string;
};

export class UserMessage {
  private _id: string;
  private _name: string;
  private _userEmail: string;
  private _message: string;

  constructor({ id, message, name, userEmail }: UserMessageParams) {
    this._id = id;
    this._message = new UserMessageMessage(message).value;
    this._userEmail = new UserMessageUserEmail(userEmail).value;
    this._name = new UserMessageTitle(name).value;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get userEmail() {
    return this._userEmail;
  }

  public get message() {
    return this._message;
  }
}
