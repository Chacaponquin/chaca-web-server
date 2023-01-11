import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("SECRET_WORD"),
          signOptions: {
            expiresIn: "12h",
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
