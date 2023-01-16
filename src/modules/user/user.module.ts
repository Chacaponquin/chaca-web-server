import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { UserController } from "./controller/user.controller";
import { JwtStrategy } from "@shared/strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { DatasetModelModule } from "@modules/dataset-model/dataset-model.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USERS, useFactory: () => UserSchema },
    ]),
    PassportModule,
    DatasetModelModule,
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
