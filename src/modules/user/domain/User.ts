import { DatasetModel } from "@modules/dataset-model/domain/DatasetModel";
import {
  NORMAL_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";

export type UserParams = {
  username: string;
  image: string | null;
  id: string;
  isSuperUser: boolean;
  models: Array<DatasetModel>;
  email: string;
};

type SimpleUserParams = UserParams & {
  password: string;
};

export abstract class User {
  private _username: string;
  private _image: string | null;
  private _id: string;
  private _isSuperUser: boolean;
  private _models: Array<DatasetModel>;
  private _email: string;

  constructor({ id, image, isSuperUser, models, username, email }: UserParams) {
    this._id = id;
    this._image = image;
    this._isSuperUser = isSuperUser;
    this._models = models;
    this._username = username;
    this._email = email;
  }

  public get id() {
    return this._id;
  }

  public get models() {
    return this._models;
  }

  public get email() {
    return this._email;
  }

  public get isSuperUser() {
    return this._isSuperUser;
  }

  public get username() {
    return this._username;
  }

  public get image() {
    return this._image;
  }

  public get limitDatasets(): number {
    if (this._isSuperUser) return SUPER_USER_LIMITS.LIMIT_DATASETS;
    else return NORMAL_USER_LIMITS.LIMIT_DATASETS;
  }

  public get limitDocuments(): number {
    if (this._isSuperUser) return SUPER_USER_LIMITS.LIMIT_DOCUMENTS;
    else return NORMAL_USER_LIMITS.LIMIT_DOCUMENTS;
  }
}

export class SimpleUser extends User {
  public password: string;

  constructor({ password, ...rest }: SimpleUserParams) {
    super(rest);
    this.password = password;
  }
}

export class GoogleUser extends User {}

export class GithubUser extends User {}
