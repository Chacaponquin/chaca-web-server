import { IUser } from "@modules/user/interfaces/user.interface";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IReturnUser, JwtPayload } from "../interfaces/auth.interface";
import { SignUpDTO } from "../dto/signUpDTO.interface";
import { UserService } from "@modules/user/services/user.service";
import { GoogleUser } from "../../user/interfaces/googleUser.interface";
import { ConfigService } from "@nestjs/config";
import { GithubUser } from "@modules/user/interfaces/githubUser.interface";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async googleSignUp(googleUser: GoogleUser): Promise<string> {
    const newUserID = await this.userService.createGoogleUser(googleUser);
    return this.generateAccessToken(newUserID);
  }

  async githubSignUp(githubUser: GithubUser): Promise<string> {
    const newUserID = await this.userService.createGithubUser(githubUser);
    return this.generateAccessToken(newUserID);
  }

  async signUp(newUser: SignUpDTO): Promise<string> {
    const newUserID = await this.userService.createUser(newUser);
    return this.generateAccessToken(newUserID);
  }

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

  public getOAuthRedirectURL(oauth: "google" | "github"): string {
    const serverURL = this.configService.get("SERVER_URL") as string;

    return serverURL + `/auth/${oauth}/redirect`;
  }
}
