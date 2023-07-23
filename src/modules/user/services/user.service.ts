import { Injectable } from "@nestjs/common";
import {
  NORMAL_USER_LIMITS,
  NO_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";
import { CryptServices } from "@shared/services/crypt.service";
import {
  CreateGithubUserDTO,
  CreateGoogleUserDTO,
  CreateSimpleUserDTO,
} from "../dto/create.dto";
import { UserRepository } from "./user-repository.service";
import { GithubUser, GoogleUser, SimpleUser, User } from "../domain/User";

@Injectable()
export class UserService {
  constructor(
    private readonly cryptServices: CryptServices,
    private readonly repository: UserRepository,
  ) {}

  public async findUserById(userId: string): Promise<User | null> {
    const foundUser = await this.repository.findById(userId);
    return foundUser;
  }

  public async createGithubUser(
    githubUser: CreateGithubUserDTO,
  ): Promise<GithubUser> {
    const newUser = await this.repository.createGithubUser(githubUser);
    return newUser;
  }

  public async createGoogleUser(
    googleUser: CreateGoogleUserDTO,
  ): Promise<GoogleUser> {
    const newUser = await this.repository.createGoogleUser(googleUser);
    return newUser;
  }

  public async createSimpleUser(
    user: CreateSimpleUserDTO,
  ): Promise<SimpleUser> {
    const hashPassword = await this.cryptServices.hash(user.password);
    const newUser = await this.repository.createSimpleUser({
      ...user,
      password: hashPassword,
    });

    return newUser;
  }

  public async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<SimpleUser | null> {
    let returnSearch: SimpleUser | null = null;
    const foundUser = await this.repository.findUserByEmail(email);

    if (foundUser) {
      if (foundUser instanceof SimpleUser) {
        const isCorrectPassword = await this.cryptServices.compare(
          password,
          foundUser.password,
        );

        if (isCorrectPassword) {
          returnSearch = foundUser;
        }
      }
    }

    return returnSearch;
  }

  noUserLimits() {
    return NO_USER_LIMITS;
  }

  normalUserLimits() {
    return NORMAL_USER_LIMITS;
  }

  superUserLimits() {
    return SUPER_USER_LIMITS;
  }
}
