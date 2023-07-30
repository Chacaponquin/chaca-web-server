import { RepeatUserEmailError } from "@modules/user/exceptions";
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
import { SignInDTO } from "../dto/signIn";
import { ReturnUser } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { CreateSimpleUserDTO } from "@modules/user/dto/create.dto";
import { NotFoundUserToLoginException } from "../exceptions";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get("/google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    // Google Auth
  }

  @Get("/google/redirect")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const token = await this.authService.googleSignUp(req.user);
    this.sendAuthCookies(res, token);
  }

  @Get("/github")
  @UseGuards(AuthGuard("github"))
  async githubLogin() {
    // Github Auth
  }

  @Get("/github/redirect")
  @UseGuards(AuthGuard("github"))
  async authCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.githubSignUp(req.user);
    this.sendAuthCookies(res, token);
  }

  @Get("/userByToken")
  @UseGuards(AuthGuard("jwt"))
  userByToken(@Req() req: any): ReturnUser | null {
    return this.authService.getReturnUser(req.user);
  }

  @Post("/signUp")
  async signUp(@Body() userSignUpDTO: CreateSimpleUserDTO): Promise<string> {
    try {
      const userToken = await this.authService.signUp(userSignUpDTO);
      return userToken;
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
    try {
      const token = await this.authService.loginUser(userSignInDTO);
      return token;
    } catch (error) {
      if (error instanceof NotFoundUserToLoginException) {
        throw new NotFoundException();
      } else {
        throw error;
      }
    }
  }

  private sendAuthCookies(response: Response, token: string): void {
    response
      .cookie("access_token", token, {})
      .redirect(
        this.configService.get<string>("CLIENT_REDIRECT_URL") as string,
      );
  }
}
