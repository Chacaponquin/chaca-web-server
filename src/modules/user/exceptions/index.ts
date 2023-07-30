import { HttpException, HttpStatus } from "@nestjs/common";

export class RepeatUserEmailError extends HttpException {
  constructor() {
    super(`Aldready exists an user with that email`, HttpStatus.UNAUTHORIZED);
  }
}

export class NotEqualUserPasswords extends Error {}

export class InvalidLoginMethodError extends Error {}

export class InvalidUserEmailException extends Error {}
export class InvalidUsernameException extends Error {}
export class InvalidUserPasswordException extends Error {}
