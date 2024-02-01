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
} from "../dto/create";
import { UserRepository } from "./user-repository.service";
import { GithubUser, GoogleUser, SimpleUser, User } from "../domain/User";
import { CreateSimpleUser, FindUserByEmailAndPassword } from "./cases";

@Injectable()
export class UserService {
  constructor(
    private readonly cryptServices: CryptServices,
    private readonly repository: UserRepository,
  ) {}

  public async clean(): Promise<void> {
    await this.repository.clean();
  }

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
    const useCase = new CreateSimpleUser(this.cryptServices, this.repository);
    return await useCase.execute(user);
  }

  public async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<SimpleUser | null> {
    const serviceCase = new FindUserByEmailAndPassword(
      this.cryptServices,
      this.repository,
    );

    return await serviceCase.execute({ email, password });
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
