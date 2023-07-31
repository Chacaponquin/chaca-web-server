import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundUserToLoginException extends HttpException {
  constructor() {
    super("Not exist that user", HttpStatus.NOT_FOUND);
  }
}
