import { UserMessage } from "@modules/user-message/domain";
import { CreateUserMessageDTO } from "@modules/user-message/dto";
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

  public async create(createDTO: CreateUserMessageDTO): Promise<UserMessage> {
    const newMessage = new this.model({
      message: createDTO.message,
      email: createDTO.email,
      title: createDTO.title,
    });

    try {
      const returnMessage = this.map(newMessage);
      await newMessage.save();
      return returnMessage;
    } catch (error) {
      await this.delete(newMessage.id);
      throw error;
    }
  }

  public async findById(id: string): Promise<UserMessage | null> {
    const foundUser = await this.model.findById(id);
    return foundUser === null ? null : this.map(foundUser);
  }

  public async delete(messageID: string): Promise<void> {
    await this.model.findByIdAndRemove(messageID);
  }

  public async clean(): Promise<void> {
    await this.model.deleteMany({});
  }

  private map(message: IUserMessage): UserMessage {
    const returnMessage = new UserMessage({
      id: message.id,
      message: message.message,
      title: message.title,
      email: message.email,
    });

    return returnMessage;
  }
}
