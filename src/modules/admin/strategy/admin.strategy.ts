import { AdminUserService } from "@modules/admin/modules/admin-user/services/admin-user.service";
import { JwtPayload } from "@modules/auth/interfaces/auth.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy) {
  constructor(private adminUserService: AdminUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_WORD,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.adminUserService.getAdminUserByID(payload.userID);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
