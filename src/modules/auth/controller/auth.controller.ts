import { Get, Post, Controller, Req, Body, Res } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { AuthGuard } from "@nestjs/passport";
import { SignInDTO } from "../dto/signIn";
import { ReturnUser } from "../interfaces/auth";
import { AuthService } from "../services/auth.service";
import { Response, Request } from "express";
import {
  CreateGithubUserDTO,
  CreateGoogleUserDTO,
  CreateSimpleUserDTO,
} from "@modules/user/dto/create.dto";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { User } from "@modules/user/domain/User";
import { ROUTES } from "@modules/app/constants";

@Controller(ROUTES.AUTH.ROOT)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly envServices: EnvService,
  ) {}

  @Get(ROUTES.AUTH.GOOGLE)
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    // Google Auth
  }

  @Get(ROUTES.AUTH.GOOGLE_REDIRECT)
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(
    @Req() req: Request & { user: CreateGoogleUserDTO },
    @Res() res: Response,
  ) {
    const token = await this.authService.googleSignUp(req.user);
    this.sendAuthCookies(res, token);
  }

  @Get(ROUTES.AUTH.GITHUB)
  @UseGuards(AuthGuard("github"))
  async githubLogin() {
    // Github Auth
  }

  @Get(ROUTES.AUTH.GITHUB_REDIRECT)
  @UseGuards(AuthGuard("github"))
  async authCallback(
    @Req() req: Request & { user: CreateGithubUserDTO },
    @Res() res: Response,
  ) {
    const token = await this.authService.githubSignUp(req.user);
    this.sendAuthCookies(res, token);
  }

  @Get(ROUTES.AUTH.USER_BY_TOKEN)
  @UseGuards(AuthGuard("jwt"))
  userByToken(@Req() req: Request & { user: User }): ReturnUser | null {
    return this.authService.getReturnUser(req.user);
  }

  @Post(ROUTES.AUTH.SIGN_UP)
  async signUp(@Body() userSignUpDTO: CreateSimpleUserDTO): Promise<string> {
    const userToken = await this.authService.signUp(userSignUpDTO);
    return userToken;
  }

  @Post(ROUTES.AUTH.SIGN_IN)
  async signIn(@Body() userSignInDTO: SignInDTO) {
    const token = await this.authService.loginUser(userSignInDTO);
    return token;
  }

  private sendAuthCookies(response: Response, token: string): void {
    response
      .cookie("access_token", token, {})
      .redirect(this.envServices.CLIENT_REDIRECT_URL);
  }
}
