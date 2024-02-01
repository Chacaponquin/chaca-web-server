import { Injectable } from "@nestjs/common";
import { UserMessage } from "../domain";
import { UserMessageRepository } from "./user-message-repository.service";
import { CreateUserMessageDTO } from "../dto";

@Injectable()
export class UserMessageService {
  constructor(private readonly repository: UserMessageRepository) {}

  public async findMessageById(id: string): Promise<UserMessage | null> {
    const foundUser = await this.repository.findById(id);
    return foundUser;
  }

  async createMessage(dto: CreateUserMessageDTO): Promise<UserMessage> {
    return await this.repository.create(dto);
  }

  public async clean(): Promise<void> {
    await this.repository.clean();
  }
}
