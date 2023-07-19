import { Injectable } from "@nestjs/common";
import {
  NORMAL_USER_LIMITS,
  NO_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";
import { Types } from "mongoose";
import { IUser } from "../infrastructure/mongo/interfaces/user.interface";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";
import { DatasetModelService } from "@modules/dataset-model/services/dataset-model.service";
import { IDatasetModel } from "@modules/dataset-model/infrastructure/mongo/interfaces/model.interface";
import { RepeatUserEmailError } from "../exceptions";
import { GoogleUser } from "@modules/user/interfaces/googleUser.interface";
import { GithubUser } from "../interfaces/githubUser.interface";
import { CryptServices } from "@shared/services/crypt.service";
import { CreateSimpleUserDTO } from "../dto/create.dto";
import { UserRepository } from "./user-repository.service";
import { SimpleUser } from "../domain/User";

@Injectable()
export class UserService {
  constructor(
    private readonly cryptServices: CryptServices,
    private readonly repository: UserRepository,
  ) {}

  private async validateUserEmail(email: string): Promise<void> {
    const foundUser = await this.userModel.findOne({ email });

    if (foundUser) {
      throw new RepeatUserEmailError();
    }
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createGithubUser(githubUser: GithubUser): Promise<string> {
    const foundUser = await this.findUserByEmail(githubUser.email);

    if (foundUser) {
      foundUser.methodLogin = LOGIN_METHOD.GITHUB;
      await foundUser.save();

      return foundUser.id;
    } else {
      const newGithubUser = new this.userModel({
        methodLogin: LOGIN_METHOD.GOOGLE,
        image: githubUser.picture,
        password: null,
        email: githubUser.email,
        username: githubUser.username,
      });
      await newGithubUser.save();

      return newGithubUser.id;
    }
  }

  async createGoogleUser(googleUser: GoogleUser): Promise<string> {
    // buscar si existe el email
    // si existe se devuelve ese ID
    const foundUser = await this.findUserByEmail(googleUser.email);

    if (foundUser) {
      foundUser.methodLogin = LOGIN_METHOD.GOOGLE;
      await foundUser.save();

      return foundUser.id;
    } else {
      const newGoogleUser = new this.userModel({
        methodLogin: LOGIN_METHOD.GOOGLE,
        image: googleUser.picture,
        password: null,
        email: googleUser.email,
        username: googleUser.username,
      });
      await newGoogleUser.save();

      return newGoogleUser.id;
    }
  }

  async createSimpleUser(user: CreateSimpleUserDTO): Promise<SimpleUser> {
    // validate
    await this.validateUserEmail(user.email);

    const hashPassword = await this.cryptServices.hash(user.password);

    return await this.repository.createSimpleUser({
      ...user,
      password: hashPassword,
    });
  }

  async getUserById(userID: string): Promise<IUser | null> {
    return await this.userModel.findById(userID);
  }

  async getUserDatasetModels(userID: string) {
    const foundUser = await this.userModel.findById(userID);

    if (foundUser) {
      const userPopulated = await foundUser.populate("datasetModels");

      return this.datasetModelService.getModelToSendClient(
        this.limitDatasetModelsToSend(userPopulated),
      );
    } else return [];
  }

  private limitDatasetModelsToSend(user: IUser): Array<IDatasetModel> {
    return user.datasetModels;
  }

  async deleteModelFromUser(userID: string, modelID: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userID },
      { $pull: { datasetsModels: modelID } },
    );
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    let login: string | null = null;

    // buscar usuario pot email
    const foundByEmail = await this.userModel.findOne({ email });

    if (foundByEmail) {
      if (foundByEmail.password) {
        // comparar contraseñas
        const isCorrectPassword = await bcrypt.compare(
          password,
          foundByEmail.password,
        );

        if (isCorrectPassword) {
          login = foundByEmail._id;
        }
      }
    }

    return login;
  }

  async setNewDatasetModel(
    userID: string,
    modelID: Types.ObjectId,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userID, {
      $push: { datasetModels: modelID },
    });
  }

  noUserLimits() {
    return NO_USER_LIMITS;
  }

  normalUserLimits() {
    return NORMAL_USER_LIMITS;
  }

  superUserLimits() {
    return SUPER_USER_LIMITS;
  }
}
