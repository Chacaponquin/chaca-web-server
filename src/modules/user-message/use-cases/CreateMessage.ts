import { UserMessage } from "../domain";
import { CreateUserMessageDTO } from "../dto";
import { UserMessageService } from "../services/user-message.service";

export class CreateMessage {
  constructor(private readonly userMessagesService: UserMessageService) {}

  async execute(dto: CreateUserMessageDTO): Promise<UserMessage> {
    const newMessage = await this.userMessagesService.createMessage(dto);
    return newMessage;
  }
}
