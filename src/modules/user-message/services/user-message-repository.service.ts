import { Injectable } from "@nestjs/common";
import { UserMessageMongoRepository } from "../infrastructure/mongo/user-message-mongo-repository.service";
import { CreateUserMessageDTO } from "../dto/user_message";
import { UserMessage } from "../domain/UserMessage";

@Injectable()
export class UserMessageRepository {
  constructor(private readonly mongoRepository: UserMessageMongoRepository) {}

  public async create(dto: CreateUserMessageDTO) {
    const newMessage = await this.mongoRepository.create(dto);
    return newMessage;
  }

  public async findById(id: string): Promise<UserMessage | null> {
    const foundMessage = await this.mongoRepository.findById(id);
    return foundMessage;
  }

  public async clean(): Promise<void> {
    await this.mongoRepository.clean();
  }
}
