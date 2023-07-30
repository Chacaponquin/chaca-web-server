import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@modules/auth/strategy/jwt";
import { UserModule } from "@modules/user/user.module";
import { GoogleOAuthStrategy } from "./strategy/google-oauth";
import { GithubOAuthStrategy } from "./strategy/github-oauth";
import { EnvModule } from "@modules/app/modules/env/env.module";
import { EnvService } from "@modules/app/modules/env/services/env.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService) => {
        return {
          secret: envService.SECRET_WORD,
          signOptions: {
            expiresIn: envService.TOKEN_EXPIRES_TIME,
          },
        };
      },
      inject: [EnvService],
    }),
    UserModule,
    EnvModule,
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
