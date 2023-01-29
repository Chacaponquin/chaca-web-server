import { Controller, Post, Body } from "@nestjs/common";
import { LoginAdminUserDTO } from "../../admin-user/dto/loginAdminUser.dto";
import { AdminAuthService } from "../services/admin-auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("/login")
  async loginUser(@Body() loginBody: LoginAdminUserDTO) {
    const token = await this.adminAuthService.loginUser(loginBody);
    return token;
  }
}
