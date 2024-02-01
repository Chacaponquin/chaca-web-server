import { CreateGoogleUserDTO } from "@modules/user/dto/create.dto";
import { AuthService } from "../services/auth.service";
import { UserService } from "@modules/user/services/user.service";

export class CreateGoogleUser {
  constructor(
    private readonly userServices: UserService,
    private readonly authServices: AuthService,
  ) {}

  async execute(dto: CreateGoogleUserDTO) {
    const newUser = await this.userServices.createGoogleUser(dto);
    return this.authServices.generateAccessToken(newUser.id);
  }
}
