import { Injectable } from "@nestjs/common";
import { IAdminUser } from "./model/admin_user";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS";
import { InjectModel } from "@nestjs/mongoose";
import { AdminUser } from "../../domain";

@Injectable()
export class AdminUserMongoRepository {
  constructor(
    @InjectModel(DB_MOELS.ADMIN_USERS)
    private readonly model: Model<IAdminUser>,
  ) {}

  public async findById(adminUserId: string): Promise<AdminUser | null> {
    const foundUser = await this.model.findById(adminUserId);
    return foundUser === null ? null : this.mapToAdminUser(foundUser);
  }

  public async findByEmail(email: string): Promise<AdminUser | null> {
    const foundUser = await this.model.findOne({ email });
    return foundUser === null ? null : this.mapToAdminUser(foundUser);
  }

  public mapToAdminUser(mongoUser: IAdminUser): AdminUser {
    return new AdminUser({
      email: mongoUser.email,
      id: mongoUser.id,
      password: mongoUser.password,
      username: mongoUser.username,
    });
  }
}
