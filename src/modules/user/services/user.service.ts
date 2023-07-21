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
import { CryptServices } from "@shared/services/crypt.service";
import { CreateGithubUserDTO, CreateSimpleUserDTO } from "../dto/create.dto";
import { UserRepository } from "./user-repository.service";
import { SimpleUser } from "../domain/User";

@Injectable()
export class UserService {
  constructor(
    private readonly cryptServices: CryptServices,
    private readonly repository: UserRepository,
  ) {}

  public async createGithubUser(
    githubUser: CreateGithubUserDTO,
  ): Promise<GithubUser> {
    const newUser = await this.repository.createGithubUser(githubUser);
    return newUser;
  }

  public async createGoogleUser(googleUser: GoogleUser): Promise<GoogleUser> {
    const newUser = await this.repository.createGoogleUser(googleUser);
    return newUser;
  }

  async createSimpleUser(user: CreateSimpleUserDTO): Promise<SimpleUser> {
    const hashPassword = await this.cryptServices.hash(user.password);
    const newUser = await this.repository.createSimpleUser({
      ...user,
      password: hashPassword,
    });

    return newUser;
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
