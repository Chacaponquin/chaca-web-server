import { Injectable } from "@nestjs/common";
import { AdminUserRepository } from "./admin-user-repository.service";
import { AdminUser } from "../domain";
import { CryptServices } from "@shared/services/crypt.service";

@Injectable()
export class AdminUserService {
  constructor(
    private readonly repository: AdminUserRepository,
    private readonly cryptService: CryptServices,
  ) {}

  public async getAdminUserByID(userID: string): Promise<AdminUser | null> {
    const foundUser = await this.repository.findById(userID);
    return foundUser;
  }

  public async findAdminUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<AdminUser | null> {
    let returnUser: AdminUser | null = null;

    const foundUserByEmail = await this.repository.findByEmail(email);

    if (foundUserByEmail) {
      const validPassword = await this.cryptService.compare(
        foundUserByEmail.password,
        password,
      );

      if (validPassword) {
        returnUser = foundUserByEmail;
      }
    }

    return returnUser;
  }
}
