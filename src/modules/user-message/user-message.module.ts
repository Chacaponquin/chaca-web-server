import { Module } from "@nestjs/common";
import { UserMessageController } from "./controller/user-message.controller";
import { UserMessageService } from "./services/user-message.service";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { UserMessageSchema } from "./schema/user-message.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USER_MESSAGE, useFactory: () => UserMessageSchema },
    ]),
  ],
  controllers: [UserMessageController],
  exports: [UserMessageService],
  providers: [UserMessageService],
})
export class UserMessageModule {}
