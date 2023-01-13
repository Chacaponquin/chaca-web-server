import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  NORMAL_USER_LIMITS,
  NO_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";
import { Model } from "mongoose";
import { SignUpDTO } from "../../auth/dto/signUpDTO.interface";
import { IUser } from "../interfaces/user.interface";
import * as bcrypt from "bcrypt";
import { DB_MOELS } from "@shared/constants/enums/DB_MODELS.enum";
import { LOGIN_METHOD } from "../constants/LOGIN_METHOD.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DB_MOELS.USERS) private readonly userModel: Model<IUser>,
  ) {}

  async createUser(user: SignUpDTO) {
    const savePassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.userModel({
      ...user,
      password: savePassword,
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
      return userPopulated.datasetModels;
    } else return [];
  }

  async deleteModelFromUser(userID: string, modelID: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userID },
      { $pull: { datasetsSchemas: modelID } },
    );
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    let login: string | null = null;

    // buscar usuario pot email
    const foundByEmail = await this.userModel.findOne({ email });

    if (foundByEmail) {
      // comparar contraseñas
      const isCorrectPassword = await bcrypt.compare(
        password,
        foundByEmail.password,
      );

      if (isCorrectPassword) {
        login = foundByEmail._id;
      }
    }

    return login;
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
