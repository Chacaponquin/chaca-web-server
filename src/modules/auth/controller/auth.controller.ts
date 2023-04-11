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
  Res,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/modules/user/services/user.service";
import { SignInDTO } from "../dto/signInDTO.interface";
import { SignUpDTO } from "../dto/signUpDTO.interface";
import { GithubOauthGuard } from "../guards/github-oauth.guard";
import { IReturnUser } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get("/google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  @Get("/google/redirect")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const token = await this.userService.createGoogleUser(req.user);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .redirect(
        this.configService.get<string>("CLIENT_REDIRECT_URL") as string,
      );
  }

  @Get("/github")
  @UseGuards(GithubOauthGuard)
  githubAuth() {
    // Github authorization
  }

  @Get("/userByToken")
  @UseGuards(AuthGuard("jwt"))
  async userByToken(@Req() req: any): Promise<IReturnUser | null> {
    return await this.authService.getReturnUser(req.user);
  }

  @Post("/signUp")
  async signUp(@Body() userSignUpDTO: SignUpDTO): Promise<string> {
    try {
      return this.authService.signUp(userSignUpDTO);
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
