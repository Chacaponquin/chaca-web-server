import { AuthService } from "@modules/auth/services/auth.service";
import { LoginAdminUserDTO } from "../../admin-user/dto/loginAdminUser.dto";
import { AdminUserService } from "../../admin-user/services/admin-user.service";
import { NotFoundException } from "@nestjs/common";

export class AdminAuthService {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly globalAuthService: AuthService,
  ) {}

  async loginUser(loginUserDTO: LoginAdminUserDTO): Promise<string> {
    const foundUserID = await this.adminUserService.findUserByEmailAndPassword(
      loginUserDTO.email,
      loginUserDTO.password,
    );

    if (foundUserID) {
      const token = this.globalAuthService.generateAccessToken(foundUserID);
      return token;
    } else throw new NotFoundException();
  }
}
