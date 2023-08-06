import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";

export class RepeatUserEmailError extends HttpException {
  constructor() {
    super(`Aldready exists an user with that email`, HttpStatus.CONFLICT);
  }
}

export class NotEqualUserPasswords extends NotFoundException {}

export class InvalidLoginMethodError extends HttpException {
  constructor(method: string) {
    super(
      `The '${method}' is not a valid login method`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidUserEmailException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidUsernameException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidUserPasswordException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
