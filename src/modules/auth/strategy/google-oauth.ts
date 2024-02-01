import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { CreateGoogleUserDTO } from "@modules/user/dto/create";
import { EnvService } from "@modules/app/modules/env/services/env.service";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly authService: AuthService,
    private readonly envService: EnvService,
  ) {
    super({
      clientID: envService.GOOGLE_CLIENT_ID,
      clientSecret: envService.GOOGLE_CLIENT_SECRET,
      callbackURL: authService.getOAuthRedirectURL("google"),
      scope: ["email", "profile"],
    });
  }

  public validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): CreateGoogleUserDTO {
    const { name, email, picture } = profile._json;

    const user: CreateGoogleUserDTO = {
      email,
      username: name,
      picture: picture || null,
    };

    return user;
  }
}
