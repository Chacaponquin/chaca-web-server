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
    this._message = message;
    this._userEmail = userEmail;
    this._name = name;
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
