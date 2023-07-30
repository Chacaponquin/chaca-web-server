import { UserService } from "@modules/user/services/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/auth";
import { User } from "@modules/user/domain/User";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_WORD,
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findUserById(payload.userID);

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
