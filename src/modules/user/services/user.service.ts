import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  NORMAL_USER_LIMITS,
  NO_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";
import { Model, Types } from "mongoose";
import { SignUpDTO } from "../../auth/dto/signUpDTO.interface";
import { IUser } from "../interfaces/user.interface";
import * as bcrypt from "bcrypt";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";
import { DatasetModelService } from "@modules/dataset-model/services/dataset-model.service";
import { IDatasetModel } from "@modules/dataset-model/interfaces/dataset-model.interface";
import { RepeatUserEmailError } from "../error";
import { GoogleUser } from "@modules/auth/interfaces/google.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DB_MOELS.USERS) private readonly userModel: Model<IUser>,
    private readonly datasetModelService: DatasetModelService,
  ) {}

  private async validateUserEmail(email: string): Promise<void> {
    const foundUser = await this.userModel.findOne({ email });

    if (foundUser) {
      throw new RepeatUserEmailError();
    }
  }

  async createGoogleUser(googleUser: GoogleUser): Promise<string> {
    // buscar si existe el email
    // si existe se devuelve ese ID
    const foundUser = await this.userModel.findOne({ email: googleUser.email });

    if (foundUser) {
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

  async createUser(user: SignUpDTO) {
    // validate
    await this.validateUserEmail(user.email);

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
      methodLogin: LOGIN_METHOD.EMAIL,
    });

    // guardar usuario
    await newUser.save();

    // retornar el id del user creado
    return newUser.id;
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
