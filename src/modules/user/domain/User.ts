import { DatasetModel } from "@modules/dataset-model/domain/DatasetModel";

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
  public username: string;
  public image: string | null;
  public id: string;
  public isSuperUser: boolean;
  public models: Array<DatasetModel>;
  public email: string;

  constructor({ id, image, isSuperUser, models, username, email }: UserParams) {
    this.id = id;
    this.image = image;
    this.isSuperUser = isSuperUser;
    this.models = models;
    this.username = username;
    this.email = email;
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
