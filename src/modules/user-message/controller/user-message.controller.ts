import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";
import { CreateUserMessageDTO } from "../dto/userMessage.dto";
import { UserMessageService } from "../services/user-message.service";

@Controller("userMessages")
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Post("/newMessage")
  @HttpCode(HttpStatus.CREATED)
  async createNewUserMessage(@Body() newMessage: CreateUserMessageDTO) {
    await this.userMessageService.createUserMessage(newMessage);
  }
}
