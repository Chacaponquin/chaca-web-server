import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateUserMessageDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  message: string;
}
