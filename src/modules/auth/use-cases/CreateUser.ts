import { UserService } from "@modules/user/services/user.service";
import { AuthService } from "../services/auth.service";
import { CreateSimpleUserDTO } from "@modules/user/dto/create.dto";

export class CreateUser {
  constructor(
    private readonly userServices: UserService,
    private readonly authServices: AuthService,
  ) {}

  async execute(dto: CreateSimpleUserDTO) {
    const newUser = await this.userServices.createSimpleUser(dto);
    return this.authServices.generateAccessToken(newUser.id);
  }
}
