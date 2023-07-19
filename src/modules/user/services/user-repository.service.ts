import { Injectable } from "@nestjs/common";
import { UserRepositoryMongo } from "../infrastructure/mongo/user-repository-mongo.service";
import { CreateSimpleUserDTO } from "../dto/create.dto";
import { SimpleUser } from "../domain/User";

@Injectable()
export class UserRepository {
  constructor(private readonly mongoRepository: UserRepositoryMongo) {}

  public async createSimpleUser(
    createUserDTO: CreateSimpleUserDTO,
  ): Promise<SimpleUser> {
    const newUser = await this.mongoRepository.createSimpleUser(createUserDTO);
    return newUser;
  }
}
