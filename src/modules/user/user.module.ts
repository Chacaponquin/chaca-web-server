import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./infrastructure/mongo/schema/user.schema";
import { DB_MOELS } from "@shared/constants/DB_MODELS";
import { UserController } from "./controller/user.controller";
import { JwtStrategy } from "@modules/auth/strategy/jwt";
import { PassportModule } from "@nestjs/passport";
import { DatasetModelModule } from "@modules/dataset-model/dataset-model.module";
import { CryptServices } from "@shared/services/crypt.service";
import { UserRepository } from "./services/user-repository.service";
import { UserRepositoryMongo } from "./infrastructure/mongo/user-repository-mongo.service";

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
  providers: [
    UserRepository,
    UserRepositoryMongo,
    UserService,
    JwtStrategy,
    CryptServices,
  ],
})
export class UserModule {}
