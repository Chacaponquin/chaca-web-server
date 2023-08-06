import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidUserMessageMessageException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidUserMessageTitleException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidUserMessageUserEmailException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
