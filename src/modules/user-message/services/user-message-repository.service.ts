import { Injectable } from "@nestjs/common";
import { UserMessageMongoRepository } from "../infrastructure/mongo/user-message-mongo-repository.service";
import { CreateUserMessageDTO } from "../dto/userMessage.dto";

@Injectable()
export class UserMessageRepository {
  constructor(private readonly mongoRepository: UserMessageMongoRepository) {}

  public async create(createUserMessageDTO: CreateUserMessageDTO) {
    const newUser = await this.mongoRepository.create(createUserMessageDTO);
    return newUser;
  }
}
