import { CreateGithubUserDTO } from "@modules/user/dto/create";
import { UserService } from "@modules/user/services/user.service";
import { AuthService } from "../services/auth.service";

export class CreateGithubUser {
  constructor(
    private readonly userServices: UserService,
    private readonly authServices: AuthService,
  ) {}

  async execute(dto: CreateGithubUserDTO) {
    const newUser = await this.userServices.createGithubUser(dto);
    return this.authServices.generateAccessToken(newUser.id);
  }
}
