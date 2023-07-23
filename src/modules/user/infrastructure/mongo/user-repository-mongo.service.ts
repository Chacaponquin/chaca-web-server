import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "./model/user.interface";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import {
  GithubUser,
  GoogleUser,
  SimpleUser,
  User,
  UserParams,
} from "@modules/user/domain/User";
import { LOGIN_METHOD } from "@modules/user/constants/LOGIN_METHOD.enum";
import { DatasetModelMongoRepository } from "@modules/dataset-model/infrastructure/mongo/dataset-model-mongo-repository.service";
import { InvalidLoginMethodError } from "@modules/user/exceptions";
import {
  CreateGithubUserDTO,
  CreateGoogleUserDTO,
  CreateSimpleUserDTO,
} from "@modules/user/dto/create.dto";

@Injectable()
export class UserRepositoryMongo {
  constructor(
    @InjectModel(DB_MOELS.USERS) private readonly model: Model<IUser>,
    private readonly datasetModelMongoRepository: DatasetModelMongoRepository,
  ) {}

  public async findById(userID: string): Promise<User | null> {
    const foundUser = await this.model.findOne({ id: userID });
    return foundUser === null ? null : this.mapToUser(foundUser);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.model.findOne({ email });
    return foundUser === null ? null : this.mapToUser(foundUser);
  }

  public async deleteUser(userID: string): Promise<void> {
    await this.model.findOneAndRemove({ id: userID });
  }

  public async createGithubUser(
    githubUserDTO: CreateGithubUserDTO,
  ): Promise<GithubUser> {
    const { email, picture, username } = githubUserDTO;

    const newGithubUser = new this.model({
      username,
      email,
      password: null,
      methodLogin: LOGIN_METHOD.GITHUB,
      image: picture,
      isSuperUser: false,
      datasetModels: [],
    });

    try {
      const returnUser = new GithubUser({
        id: newGithubUser.id,
        username: newGithubUser.username,
        email: newGithubUser.email,
        image: newGithubUser.image,
        isSuperUser: newGithubUser.isSuperUser,
        models: [],
      });

      await newGithubUser.save();
      return returnUser;
    } catch (error) {
      await this.deleteUser(newGithubUser.id);
      throw error;
    }
  }

  public async createGoogleUser(
    googleUserDTO: CreateGoogleUserDTO,
  ): Promise<GoogleUser> {
    const { email, picture, username } = googleUserDTO;

    const newGoogleUser = new this.model({
      username,
      email,
      password: null,
      methodLogin: LOGIN_METHOD.GITHUB,
      image: picture,
      isSuperUser: false,
      datasetModels: [],
    });

    try {
      const returnUser = new GoogleUser({
        id: newGoogleUser.id,
        username: newGoogleUser.username,
        email: newGoogleUser.email,
        image: newGoogleUser.image,
        isSuperUser: newGoogleUser.isSuperUser,
        models: [],
      });

      await newGoogleUser.save();
      return returnUser;
    } catch (error) {
      await this.deleteUser(newGoogleUser.id);
      throw error;
    }
  }

  public async createSimpleUser(
    createUserDTO: CreateSimpleUserDTO,
  ): Promise<SimpleUser> {
    const { password, username, email } = createUserDTO;

    const newSimpleUser = new this.model({
      username,
      email,
      password,
      methodLogin: LOGIN_METHOD.EMAIL,
      image: null,
      isSuperUser: false,
      datasetModels: [],
    });

    try {
      const returnUser = new SimpleUser({
        email: newSimpleUser.email,
        username: newSimpleUser.username,
        image: newSimpleUser.image,
        id: newSimpleUser.id,
        isSuperUser: newSimpleUser.isSuperUser,
        models: [],
        password: newSimpleUser.password as string,
      });

      await newSimpleUser.save();
      return returnUser;
    } catch (error) {
      await this.deleteUser(newSimpleUser.id);
      throw error;
    }
  }

  public async getAll(): Promise<Array<User>> {
    const allUsers = await this.model.find();
    return allUsers.map((u) => this.mapToUser(u));
  }

  private mapToUser(mongoUser: IUser): User {
    const userParams: UserParams = {
      id: mongoUser.id,
      email: mongoUser.email,
      image: mongoUser.image,
      isSuperUser: mongoUser.isSuperUser,
      username: mongoUser.username,
      models: mongoUser.datasetModels.map((m) =>
        this.datasetModelMongoRepository.mapToModel(m),
      ),
    };

    if (mongoUser.methodLogin === LOGIN_METHOD.EMAIL) {
      return new SimpleUser({
        ...userParams,
        password: mongoUser.password as string,
      });
    } else if (mongoUser.methodLogin === LOGIN_METHOD.GITHUB) {
      return new GithubUser(userParams);
    } else if (mongoUser.methodLogin === LOGIN_METHOD.GOOGLE) {
      return new GoogleUser(userParams);
    } else {
      throw new InvalidLoginMethodError();
    }
  }
}
