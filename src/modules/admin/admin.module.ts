import { Module } from "@nestjs/common";
import { AdminUserModule } from "./modules/admin-user/admin-user.module";
import { AdminStrategy } from "./strategy/admin.strategy";
import { MediaModule } from "./modules/media/media.module";

@Module({
  imports: [AdminUserModule, MediaModule],
  exports: [AdminUserModule],
  controllers: [],
  providers: [AdminStrategy],
})
export class AdminModule {}
