import { RepeatUserEmailError } from "@modules/user/error";
import {
  NotFoundException,
  Get,
  Post,
  Controller,
  Req,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/modules/user/services/user.service";
import { SignInDTO } from "../dto/signInDTO.interface";
import { SignUpDTO } from "../dto/signUpDTO.interface";
import { IReturnUser } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get("/userByToken")
  @UseGuards(AuthGuard("jwt"))
  async userByToken(@Req() req: any): Promise<IReturnUser | null> {
    return await this.authService.getReturnUser(req.user);
  }

  @Post("/signUp")
  async signUp(@Body() userSignUpDTO: SignUpDTO) {
    try {
      const newUserID = await this.userService.createUser(userSignUpDTO);
      return this.authService.generateAccessToken(newUserID);
    } catch (error) {
      if (error instanceof RepeatUserEmailError) {
        throw new HttpException(
          "That user aldready exists",
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw error;
      }
    }
  }

  @Post("/signIn")
  async signIn(@Body() userSignInDTO: SignInDTO) {
    const foundUserID = await this.userService.loginUser(
      userSignInDTO.email,
      userSignInDTO.password,
    );

    if (foundUserID) {
      return this.authService.generateAccessToken(foundUserID);
    } else {
      throw new NotFoundException();
    }
  }
}
