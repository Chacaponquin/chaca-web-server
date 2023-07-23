export type AdminUserParams = {
  username: string;
  password: string;
  email: string;
  id: string;
};

export class AdminUser {
  private _username: string;
  private _password: string;
  private _email: string;
  private _id: string;

  constructor({ email, id, password, username }: AdminUserParams) {
    this._email = email;
    this._password = password;
    this._id = id;
    this._username = username;
  }

  public get id() {
    return this._id;
  }

  public get username() {
    return this._username;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }
}
