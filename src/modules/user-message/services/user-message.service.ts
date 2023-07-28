import { Injectable } from "@nestjs/common";
import { UserMessage } from "../domain/UserMessage";
import { UserMessageRepository } from "./user-message-repository.service";
import { CreateUserMessageDTO } from "../dto/user_message";

@Injectable()
export class UserMessageService {
  constructor(private readonly repository: UserMessageRepository) {}

  public async createUserMessage(
    messageDTO: CreateUserMessageDTO,
  ): Promise<UserMessage> {
    const newMessage = await this.repository.create(messageDTO);
    return newMessage;
  }

  public async findMessageById(id: string): Promise<UserMessage | null> {
    const foundUser = await this.repository.findById(id);
    return foundUser;
  }

  public async clean(): Promise<void> {
    await this.repository.clean();
  }
}
