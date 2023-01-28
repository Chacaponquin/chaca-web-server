import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminUserSchema } from "./schemas/adminUser.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.ADMIN_USERS, useFactory: () => AdminUserSchema },
    ]),
    AuthModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AdminModule {}
