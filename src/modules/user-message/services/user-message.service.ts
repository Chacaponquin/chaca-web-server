import { Injectable } from "@nestjs/common";
import { UserMessage } from "../domain/UserMessage";
import { UserMessageRepository } from "./user-message-repository.service";
import { CreateUserMessageDTO } from "../dto/userMessage.dto";

@Injectable()
export class UserMessageService {
  constructor(private readonly repository: UserMessageRepository) {}

  public async createUserMessage(
    messageDTO: CreateUserMessageDTO,
  ): Promise<UserMessage> {
    const newMessage = await this.repository.create(messageDTO);
    return newMessage;
  }
}
