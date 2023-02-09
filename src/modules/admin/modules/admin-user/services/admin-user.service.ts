import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { Model } from "mongoose";
import { IAdminUser } from "../interfaces/adminUser.interface";
import * as bs from "bcrypt";

@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel(DB_MOELS.ADMIN_USERS)
    private readonly adminUserModel: Model<IAdminUser>,
  ) {}

  public async getAdminUserByID(userID: string): Promise<string | null> {
    const foundUser = await this.adminUserModel.findById(userID);

    if (foundUser) return foundUser.id;
    else return null;
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string | null> {
    const findUserByEmail = await this.adminUserModel.findOne({
      email: email,
    });

    if (findUserByEmail) {
      const isCorrectPassword = await bs.compare(
        findUserByEmail.password,
        password,
      );

      if (isCorrectPassword) {
        return findUserByEmail.id;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
