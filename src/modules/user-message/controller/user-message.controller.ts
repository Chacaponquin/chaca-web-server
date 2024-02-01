import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";
import { CreateUserMessageDTO } from "../dto";
import { UserMessageService } from "../services/user-message.service";
import { ROUTES } from "@modules/app/constants";
import { CreateMessage } from "../use-cases";

@Controller(ROUTES.USER_MESSAGE.ROOT)
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Post(ROUTES.USER_MESSAGE.CREATE_MESSAGE)
  @HttpCode(HttpStatus.CREATED)
  async createNewUserMessage(
    @Body() newMessage: CreateUserMessageDTO,
  ): Promise<void> {
    const useCase = new CreateMessage(this.userMessageService);
    await useCase.execute(newMessage);
  }
}
