import { Module } from "@nestjs/common";
import { AdminUserModule } from "../admin-user/admin-user.module";
import { AuthModule as AppAuthModule } from "../../../auth/auth.module";

@Module({
  imports: [AppAuthModule, AdminUserModule],
  controllers: [],
  exports: [],
  providers: [],
})
export class AuthModule {}
