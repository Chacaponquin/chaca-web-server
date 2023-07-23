import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { AdminUserSchema } from "./infrastructure/mongo/schemas/adminUser.schema";
import { AdminUserService } from "./services/admin-user.service";
import { AdminUserRepository } from "./services/admin-user-repository.service";
import { AdminUserMongoRepository } from "./infrastructure/mongo/admin-user-mongo-repository.service";
import { CryptServices } from "@shared/services/crypt.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.ADMIN_USERS, useFactory: () => AdminUserSchema },
    ]),
  ],
  controllers: [],
  exports: [AdminUserService],
  providers: [
    AdminUserService,
    AdminUserRepository,
    AdminUserMongoRepository,
    CryptServices,
  ],
})
export class AdminUserModule {}
