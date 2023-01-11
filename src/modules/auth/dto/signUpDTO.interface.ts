import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  username: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  comfirmPassword: string;
}
