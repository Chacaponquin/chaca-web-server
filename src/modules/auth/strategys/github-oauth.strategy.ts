import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { AuthService } from "../services/auth.service";
import { GithubUser } from "@modules/user/interfaces/githubUser.interface";

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: authService.getOAuthRedirectURL("github"),
      scope: ["public_profile"],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
  ): Promise<GithubUser> {
    const { email, avatar_url, login } = profile._json;

    const user: GithubUser = {
      email,
      picture: avatar_url || null,
      username: login,
    };

    return user;
  }
}
