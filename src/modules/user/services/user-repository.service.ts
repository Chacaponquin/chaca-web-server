import { Injectable } from "@nestjs/common";
import { UserRepositoryMongo } from "../infrastructure/mongo/user-repository-mongo.service";
import {
  CreateGithubUserDTO,
  CreateGoogleUserDTO,
  CreateSimpleUserDTO,
} from "../dto/create.dto";
import { GithubUser, GoogleUser, SimpleUser, User } from "../domain/User";
import { RepeatUserEmailError } from "../exceptions";
import { DatasetModelService } from "@modules/dataset-model/services/dataset-model.service";

@Injectable()
export class UserRepository {
  constructor(
    private readonly mongoRepository: UserRepositoryMongo,
    private readonly datasetModelService: DatasetModelService,
  ) {}

  public async validateNotRepeatEmail(email: string): Promise<void> {
    const foundUser = await this.mongoRepository.findByEmail(email);

    if (foundUser) {
      throw new RepeatUserEmailError();
    }
  }

  public async clean(): Promise<void> {
    await this.mongoRepository.clean();
  }

  public async findById(userId: string): Promise<User | null> {
    const foundUser = await this.mongoRepository.findById(userId);
    return foundUser;
  }

  public async createSimpleUser(
    createUserDTO: CreateSimpleUserDTO,
  ): Promise<SimpleUser> {
    await this.validateNotRepeatEmail(createUserDTO.email);
    const newUser = await this.mongoRepository.createSimpleUser(createUserDTO);
    return newUser;
  }

  public async createGithubUser(
    githubUserDTO: CreateGithubUserDTO,
  ): Promise<GithubUser> {
    await this.validateNotRepeatEmail(githubUserDTO.email);
    const newUser = await this.mongoRepository.createGithubUser(githubUserDTO);
    return newUser;
  }

  public async createGoogleUser(
    googleUserDTO: CreateGoogleUserDTO,
  ): Promise<GoogleUser> {
    await this.validateNotRepeatEmail(googleUserDTO.email);
    const newUser = await this.mongoRepository.createGoogleUser(googleUserDTO);
    return newUser;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.mongoRepository.findByEmail(email);

    if (foundUser) {
      const userModels = await this.datasetModelService.findModelsById(
        foundUser.modelsId,
      );

      foundUser.setModels(userModels);
    }
    return foundUser;
  }
}
