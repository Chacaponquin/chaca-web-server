import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminUserModule } from "./modules/admin-user/admin-user.module";

@Module({
  imports: [AuthModule, AdminUserModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AdminModule {}
