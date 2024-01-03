import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";
import { CreateUserMessageDTO } from "../dto/user_message";
import { UserMessageService } from "../services/user-message.service";
import { ROUTES } from "@modules/app/constants";

@Controller(ROUTES.USER_MESSAGE.ROOT)
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Post(ROUTES.USER_MESSAGE.CREATE_MESSAGE)
  @HttpCode(HttpStatus.CREATED)
  async createNewUserMessage(@Body() newMessage: CreateUserMessageDTO) {
    await this.userMessageService.createUserMessage(newMessage);
  }
}
