import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectFieldTypeException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectFieldParamsException extends Error {}
