import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { AuthService } from "../services/auth.service";
import { CreateGithubUserDTO } from "@modules/user/dto/create";
import { EnvService } from "@modules/app/modules/env/services/env.service";

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private readonly authService: AuthService,
    private readonly envService: EnvService,
  ) {
    super({
      clientID: envService.GITHUB_CLIENT_ID,
      clientSecret: envService.GITHUB_CLIENT_SECRET,
      callbackURL: authService.getOAuthRedirectURL("github"),
      scope: ["public_profile"],
    });
  }

  public validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
  ): CreateGithubUserDTO {
    const { email, avatar_url, login } = profile._json;

    const user: CreateGithubUserDTO = {
      email,
      picture: avatar_url || null,
      username: login,
    };

    return user;
  }
}
