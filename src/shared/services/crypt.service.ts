import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptServices {
  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async compare(hashString: string, compareString: string): Promise<boolean> {
    return await bcrypt.compare(hashString, compareString);
  }
}
