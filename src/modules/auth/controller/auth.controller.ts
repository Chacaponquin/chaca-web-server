import { Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import { SignUpDTO } from "../dto/signUpDTO.interface";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("/signUp")
  async signUp(@Body() userDTO: SignUpDTO) {
    const newUserID = await this.userService.createUser(userDTO);
    return this.authService.generateAccessToken(newUserID);
  }
}
