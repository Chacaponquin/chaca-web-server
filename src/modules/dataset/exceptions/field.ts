import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectDefinedFieldDatatypeException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectFieldArrayConfigException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectFieldNameException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
