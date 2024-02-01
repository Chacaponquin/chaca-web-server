import { CreateSimpleUserDTO } from "@modules/user/dto/create";
import { UserPassword } from "@modules/user/value-object";
import { CryptServices } from "@shared/services/crypt.service";
import { UserRepository } from "../user-repository.service";

export class CreateSimpleUser {
  constructor(
    private readonly cryptServices: CryptServices,
    private readonly repository: UserRepository,
  ) {}

  async execute(user: CreateSimpleUserDTO) {
    const password = new UserPassword(user.password).value;
    const hashPassword = await this.cryptServices.hash(password);

    const newUser = await this.repository.createSimpleUser({
      ...user,
      password: hashPassword,
    });

    return newUser;
  }
}
