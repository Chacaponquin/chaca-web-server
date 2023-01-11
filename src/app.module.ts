import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UtilsModule } from "./modules/utils/utils.module";
import { ApiModule } from "./modules/api/api.module";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.development",
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {}),
    UserModule,
    UtilsModule,
    ApiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
