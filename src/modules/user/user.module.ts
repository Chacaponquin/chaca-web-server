import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, UserSchemaName } from "./schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: UserSchemaName, useFactory: () => UserSchema },
    ]),
  ],
  controllers: [],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
