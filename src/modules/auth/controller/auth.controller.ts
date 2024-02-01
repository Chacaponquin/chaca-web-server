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
} from "@modules/user/dto/create";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { User } from "@modules/user/domain/User";
import { ROUTES } from "@modules/app/constants";
import {
  CreateGithubUser,
  CreateGoogleUser,
  CreateUser,
  LoginUser,
} from "../use-cases";
import { UserService } from "@modules/user/services/user.service";

@Controller(ROUTES.AUTH.ROOT)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly envServices: EnvService,
    private readonly userServices: UserService,
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
    const useCase = new CreateGoogleUser(this.userServices, this.authService);
    const token = await useCase.execute(req.user);
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
    const useCase = new CreateGithubUser(this.userServices, this.authService);
    const token = await useCase.execute(req.user);
    this.sendAuthCookies(res, token);
  }

  @Get(ROUTES.AUTH.USER_BY_TOKEN)
  @UseGuards(AuthGuard("jwt"))
  userByToken(@Req() req: Request & { user: User }): ReturnUser | null {
    return this.authService.getReturnUser(req.user);
  }

  @Post(ROUTES.AUTH.SIGN_UP)
  async signUp(@Body() userSignUpDTO: CreateSimpleUserDTO): Promise<string> {
    const useCase = new CreateUser(this.userServices, this.authService);
    return await useCase.execute(userSignUpDTO);
  }

  @Post(ROUTES.AUTH.SIGN_IN)
  async signIn(@Body() userSignInDTO: SignInDTO) {
    const useCase = new LoginUser(this.userServices, this.authService);
    return await useCase.execute(userSignInDTO);
  }

  private sendAuthCookies(response: Response, token: string): void {
    response
      .cookie("access_token", token, {})
      .redirect(this.envServices.CLIENT_REDIRECT_URL);
  }
}
