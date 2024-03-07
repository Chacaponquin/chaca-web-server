import { UserService } from "@modules/user/services/user.service";
import { SignInDTO } from "../dto/sign-in";
import { AuthService } from "../services/auth.service";
import { NotFoundUserToLoginException } from "../exceptions";

export class LoginUser {
  constructor(
    private readonly userServices: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(dto: SignInDTO) {
    const foundUser = await this.userServices.findUserByEmailAndPassword(
      dto.email,
      dto.password,
    );

    if (foundUser) {
      const token = this.authService.generateAccessToken(foundUser.id);
      return token;
    } else {
      throw new NotFoundUserToLoginException();
    }
  }
}
