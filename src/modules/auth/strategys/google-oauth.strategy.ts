import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleUser } from "../../user/interfaces/googleUser.interface";
import { AuthService } from "../services/auth.service";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: authService.getOAuthRedirectURL("google"),
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<GoogleUser> {
    const { name, email, picture } = profile._json;

    const user: GoogleUser = {
      email,
      username: name,
      picture: picture || null,
    };

    return user;
  }
}
