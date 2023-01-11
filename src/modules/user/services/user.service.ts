import { Injectable } from "@nestjs/common";
import {
  NORMAL_USER_LIMITS,
  NO_USER_LIMITS,
  SUPER_USER_LIMITS,
} from "../constants/USER_LIMITS.enum";

@Injectable()
export class UserService {
  noUserLimits() {
    return NO_USER_LIMITS;
  }

  normalUserLimits() {
    return NORMAL_USER_LIMITS;
  }

  superUserLimits() {
    return SUPER_USER_LIMITS;
  }
}
