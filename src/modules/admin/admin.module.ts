import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminUserModule } from "./modules/admin-user/admin-user.module";
import { AdminStrategy } from "./strategy/admin.strategy";
import { AdminDocsModule } from "./modules/docs/admin-docs.module";

@Module({
  imports: [AuthModule, AdminUserModule, AdminDocsModule],
  exports: [AdminUserModule],
  controllers: [],
  providers: [AdminStrategy],
})
export class AdminModule {}
