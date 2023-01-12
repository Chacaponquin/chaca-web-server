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
import bcrypt from "bcrypt";
import { DB_MOELS } from "@shared/constants/enums/DB_MODELS.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DB_MOELS.USERS) private readonly userModel: Model<IUser>,
  ) {}

  async createUser(user: SignUpDTO) {
    const savePassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({ ...user, password: savePassword });
    await newUser.save();
    return newUser.id;
  }

  async getUserById(userID: string): Promise<IUser | null> {
    return await this.userModel.findById(userID);
  }

  async deleteModelFromUser(userID: string, modelID: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userID },
      { $pull: { datasetsSchemas: modelID } },
    );
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
