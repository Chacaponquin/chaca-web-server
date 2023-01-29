import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { AdminUserSchema } from "./schemas/adminUser.schema";
import { AdminUserService } from "./services/admin-user.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.ADMIN_USERS, useFactory: () => AdminUserSchema },
    ]),
  ],
  controllers: [],
  exports: [AdminUserService],
  providers: [AdminUserService],
})
export class AdminUserModule {}
