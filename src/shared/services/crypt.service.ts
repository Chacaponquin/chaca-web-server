import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptServices {
  public async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  public async compare(
    hashString: string,
    compareString: string,
  ): Promise<boolean> {
    return await bcrypt.compare(hashString, compareString);
  }
}
