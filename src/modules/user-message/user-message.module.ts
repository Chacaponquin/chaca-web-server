import { Module } from "@nestjs/common";
import { UserMessageController } from "./controller/user-message.controller";
import { UserMessageService } from "./services/user-message.service";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS";
import { UserMessageSchema } from "./infrastructure/mongo/schema";
import { UserMessageRepository } from "./services/user-message-repository.service";
import { UserMessageMongoRepository } from "./infrastructure/mongo/user-message-mongo-repository.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USER_MESSAGE, useFactory: () => UserMessageSchema },
    ]),
  ],
  controllers: [UserMessageController],
  exports: [UserMessageService],
  providers: [
    UserMessageRepository,
    UserMessageMongoRepository,
    UserMessageService,
  ],
})
export class UserMessageModule {}
