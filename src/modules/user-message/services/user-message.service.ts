import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/enums/DB_MODELS.enum";
import { Model } from "mongoose";
import { CreateUserMessageDTO } from "../dto/userMessage.dto";
import { IUserMessage } from "../interfaces/user-message.interface";

@Injectable()
export class UserMessageService {
  constructor(
    @InjectModel(DB_MOELS.USER_MESSAGE)
    private readonly userMessageModel: Model<IUserMessage>,
  ) {}

  async createUserMessage(messageDTO: CreateUserMessageDTO): Promise<string> {
    const newMessage = new this.userMessageModel(messageDTO);

    // save newUserMessage
    await newMessage.save();

    return newMessage._id;
  }
}
