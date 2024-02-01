import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateUserMessageDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  message: string;
}
