import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminUserModule } from "./modules/admin-user/admin-user.module";
import { AdminStrategy } from "./strategy/admin.strategy";

@Module({
  imports: [AuthModule, AdminUserModule],
  exports: [AdminUserModule],
  controllers: [],
  providers: [AdminStrategy],
})
export class AdminModule {}
