import {
  UserMessageMessage,
  UserMessageTitle,
  UserMessageUserEmail,
} from "../value-object";

export type UserMessageParams = {
  id: string;
  title: string;
  email: string;
  message: string;
};

export class UserMessage {
  private _id: string;
  private _title: string;
  private _email: string;
  private _message: string;

  constructor({ id, message, email, title }: UserMessageParams) {
    this._id = id;
    this._message = new UserMessageMessage(message).value;
    this._email = new UserMessageUserEmail(email).value;
    this._title = new UserMessageTitle(title).value;
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get email() {
    return this._email;
  }

  public get message() {
    return this._message;
  }
}
