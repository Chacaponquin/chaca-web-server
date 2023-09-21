import { DatasetModel } from "@modules/dataset-model/domain/DatasetModel";
import {
  NORMAL_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";
import { UserEmail, UserImage, Username } from "../value-object";

export type UserParams = {
  username: string;
  image: string | null;
  id: string;
  isSuperUser: boolean;
  models?: Array<DatasetModel>;
  modelsId?: Array<string>;
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
  private _models: Array<DatasetModel> = [];
  private _email: string;
  private _modelsId: Array<string> = [];

  constructor({
    id,
    image,
    isSuperUser,
    models = [],
    username,
    email,
    modelsId = [],
  }: UserParams) {
    this._id = id;
    this._image = new UserImage(image).value;
    this._isSuperUser = isSuperUser;
    this._models = models;
    this._username = new Username(username).value;
    this._email = new UserEmail(email).value;
    this._modelsId = modelsId;
  }

  public get modelsId() {
    return this._modelsId;
  }

  public setModels(models: Array<DatasetModel>): void {
    this._models = models;
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
  private _password: string;

  constructor({ password, ...rest }: SimpleUserParams) {
    super(rest);
    this._password = password;
  }

  public get password() {
    return this._password;
  }
}

export class GoogleUser extends User {}

export class GithubUser extends User {}
