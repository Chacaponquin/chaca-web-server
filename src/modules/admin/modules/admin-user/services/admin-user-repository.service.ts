import { Injectable } from "@nestjs/common";
import { AdminUserMongoRepository } from "../infrastructure/mongo/admin-user-mongo-repository.service";
import { AdminUser } from "../domain";

@Injectable()
export class AdminUserRepository {
  constructor(private readonly mongoRepository: AdminUserMongoRepository) {}

  public async findById(adminUserID: string): Promise<AdminUser | null> {
    const foundUser = await this.mongoRepository.findById(adminUserID);
    return foundUser;
  }

  public async findByEmail(email: string): Promise<AdminUser | null> {
    const foundUser = await this.mongoRepository.findByEmail(email);
    return foundUser;
  }
}
