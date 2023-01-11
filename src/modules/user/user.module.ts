import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";

@Module({
  controllers: [],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
