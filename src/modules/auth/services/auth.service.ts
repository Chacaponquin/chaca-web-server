import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ReturnUser, JwtPayload } from "../interfaces/auth.interface";
import { UserService } from "@modules/user/services/user.service";
import { ConfigService } from "@nestjs/config";
import {
  CreateGithubUserDTO,
  CreateGoogleUserDTO,
  CreateSimpleUserDTO,
} from "@modules/user/dto/create.dto";
import { User } from "@modules/user/domain/User";
import { SignInDTO } from "../dto/signIn";
import { NotFoundUserToLoginException } from "../exceptions";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  public async googleSignUp(googleUser: CreateGoogleUserDTO): Promise<string> {
    const newUser = await this.userService.createGoogleUser(googleUser);
    return this.generateAccessToken(newUser.id);
  }

  public async githubSignUp(githubUser: CreateGithubUserDTO): Promise<string> {
    const newUser = await this.userService.createGithubUser(githubUser);
    return this.generateAccessToken(newUser.id);
  }

  async signUp(simpleUser: CreateSimpleUserDTO): Promise<string> {
    const newUser = await this.userService.createSimpleUser(simpleUser);
    return this.generateAccessToken(newUser.id);
  }

  private generateAccessToken(userID: string): string {
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
    const serverURL = this.configService.get("SERVER_URL") as string;
    return serverURL + `/auth/${oauth}/redirect`;
  }

  public async loginUser(userSignInDTO: SignInDTO): Promise<string | null> {
    const foundUser = await this.userService.findUserByEmailAndPassword(
      userSignInDTO.email,
      userSignInDTO.password,
    );

    if (foundUser) {
      const token = this.generateAccessToken(foundUser.id);
      return token;
    } else {
      throw new NotFoundUserToLoginException();
    }
  }
}
