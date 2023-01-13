import { IUser } from "@modules/user/interfaces/user.interface";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IReturnUser, JwtPayload } from "../interfaces/auth.interface";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(userID: string): string {
    const payload: JwtPayload = { userID };
    return this.jwtService.sign(payload);
  }

  async getReturnUser(user: IUser): Promise<IReturnUser> {
    return {
      image: user.image,
      isSuperUser: user.isSuperUser,
      limitDatasets: user.limitDatasets,
      username: user.username,
      limitDocuments: user.limitDocuments,
    };
  }

  async authenticateToken(token: string): Promise<null | JwtPayload> {
    try {
      const user = await this.jwtService.verifyAsync(token);
      return user;
    } catch (error) {
      return null;
    }
  }
}
