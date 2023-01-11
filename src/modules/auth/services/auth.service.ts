import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/auth.interface";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(userID: string): string {
    const payload: JwtPayload = { userID };
    return this.jwtService.sign(payload);
  }
}
