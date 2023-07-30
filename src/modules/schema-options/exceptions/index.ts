import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundOptionError extends HttpException {
  constructor(public readonly schema: string, public readonly option: string) {
    super(
      `The option '${option}' do not exists in the schema '${schema}'`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class NotFoundSchemaError extends HttpException {
  constructor(public readonly schema: string) {
    super(`The schema '${schema}' do not exists`, HttpStatus.NOT_FOUND);
  }
}

export class InvalidOptionValueLimitException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
