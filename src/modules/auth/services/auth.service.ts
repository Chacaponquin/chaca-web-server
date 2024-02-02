import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ReturnUser, JwtPayload } from "../interfaces/auth";
import { User } from "@modules/user/domain/User";
import { EnvService } from "@modules/app/modules/env/services/env.service";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private envService: EnvService) {}

  public generateAccessToken(userID: string): string {
    const payload: JwtPayload = { userID };
    return this.jwtService.sign(payload);
  }

  public getReturnUser(user: User): ReturnUser {
    return {
      image: user.image,
      isSuperUser: user.isSuperUser,
      limitDatasets: user.limitDatasets,
      username: user.username,
      limitDocuments: user.limitDocuments,
    };
  }

  public async authenticateToken(token: string): Promise<null | JwtPayload> {
    try {
      const user = await this.jwtService.verifyAsync(token);
      return user;
    } catch (error) {
      return null;
    }
  }

  public getOAuthRedirectURL(oauth: "google" | "github"): string {
    const serverURL = this.envService.SERVER_URL;
    return serverURL + `/auth/${oauth}/redirect`;
  }
}
