import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../services/auth.service";
import { CreateGoogleUserDTO } from "@modules/user/dto/create.dto";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
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
