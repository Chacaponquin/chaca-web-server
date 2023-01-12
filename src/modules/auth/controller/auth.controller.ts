import { Body } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import { SignInDTO } from "../dto/signInDTO.interface";
import { SignUpDTO } from "../dto/signUpDTO.interface";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("/signUp")
  async signUp(@Body() userSignUpDTO: SignUpDTO) {
    const newUserID = await this.userService.createUser(userSignUpDTO);
    return this.authService.generateAccessToken(newUserID);
  }

  @Post("/signIn")
  async signIn(@Body() userSignInDTO: SignInDTO) {
    const foundUserID = await this.userService.loginUser(
      userSignInDTO.email,
      userSignInDTO.password,
    );

    if (foundUserID) return this.authService.generateAccessToken(foundUserID);
    else {
      throw new NotFoundException();
    }
  }
}
