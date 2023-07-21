import { UserMessage } from "@modules/user-message/domain/UserMessage";
import { CreateUserMessageDTO } from "@modules/user-message/dto/userMessage.dto";
import { IUserMessage } from "@modules/user-message/infrastructure/mongo/model/user-message.interface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { Model } from "mongoose";

@Injectable()
export class UserMessageMongoRepository {
  constructor(
    @InjectModel(DB_MOELS.USER_MESSAGE)
    private readonly model: Model<IUserMessage>,
  ) {}

  public async create(
    createUserMessageDTO: CreateUserMessageDTO,
  ): Promise<UserMessage> {
    const { message, name, userEmail } = createUserMessageDTO;

    const newMessage = new this.model({ userEmail, name, message });

    try {
      const returnMessage = new UserMessage({
        id: newMessage.id,
        message: newMessage.message,
        name: newMessage.name,
        userEmail: newMessage.userEmail,
      });

      await newMessage.save();
      return returnMessage;
    } catch (error) {
      await this.delete(newMessage.id);
      throw error;
    }
  }

  public async delete(messageID: string): Promise<void> {
    await this.model.findByIdAndRemove(messageID);
  }
}
