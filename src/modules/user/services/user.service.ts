import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  NORMAL_USER_LIMITS,
  NO_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";
import { UserSchemaName } from "../schema/user.schema";
import { Model } from "mongoose";
import { SignUpDTO } from "../../auth/dto/signUpDTO.interface";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName) private readonly userModel: Model<IUser>,
  ) {}

  async createUser(user: SignUpDTO) {
    const savePassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({ ...user, password: savePassword });
    await newUser.save();
    return newUser.id;
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
