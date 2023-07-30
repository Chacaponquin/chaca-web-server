import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@modules/auth/strategy/jwt.strategy";
import { UserModule } from "@modules/user/user.module";
import { GoogleOAuthStrategy } from "./strategy/google-oauth.strategy";
import { GithubOAuthStrategy } from "./strategy/github-oauth.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>("SECRET_WORD"),
          signOptions: {
            expiresIn: configService.get<string>("CURRENT_USER_TOKEN_EXPIRES"),
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleOAuthStrategy,
    GithubOAuthStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
