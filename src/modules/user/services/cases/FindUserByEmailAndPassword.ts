import { SimpleUser } from "@modules/user/domain";
import { CryptServices } from "@shared/services/crypt.service";
import { UserRepository } from "../user-repository.service";

interface Props {
  password: string;
  email: string;
}

export class FindUserByEmailAndPassword {
  constructor(
    private readonly cryptServices: CryptServices,
    private readonly repository: UserRepository,
  ) {}

  async execute({ email, password }: Props) {
    let returnSearch: SimpleUser | null = null;
    const foundUser = await this.repository.findUserByEmail(email);

    if (foundUser) {
      if (foundUser instanceof SimpleUser) {
        const isCorrectPassword = await this.cryptServices.compare(
          password,
          foundUser.password,
        );

        if (isCorrectPassword) {
          returnSearch = foundUser;
        }
      }
    }

    return returnSearch;
  }
}
