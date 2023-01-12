import { UserService } from "@modules/user/services/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../../auth/interfaces/auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_WORD,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getUserById(payload.userID);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
