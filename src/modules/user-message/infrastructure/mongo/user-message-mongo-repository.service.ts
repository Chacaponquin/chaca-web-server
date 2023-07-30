import { UserMessage } from "@modules/user-message/domain/UserMessage";
import { CreateUserMessageDTO } from "@modules/user-message/dto/user_message";
import { IUserMessage } from "@modules/user-message/infrastructure/mongo/model/user-message.interface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS";
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
      const returnMessage = this._mapToUserMessage(newMessage);
      await newMessage.save();
      return returnMessage;
    } catch (error) {
      await this.delete(newMessage.id);
      throw error;
    }
  }

  public async findById(id: string): Promise<UserMessage | null> {
    const foundUser = await this.model.findById(id);
    return foundUser === null ? null : this._mapToUserMessage(foundUser);
  }

  public async delete(messageID: string): Promise<void> {
    await this.model.findByIdAndRemove(messageID);
  }

  public async clean(): Promise<void> {
    await this.model.deleteMany({});
  }

  private _mapToUserMessage(message: IUserMessage): UserMessage {
    const returnMessage = new UserMessage({
      id: message.id,
      message: message.message,
      name: message.name,
      userEmail: message.userEmail,
    });

    return returnMessage;
  }
}
