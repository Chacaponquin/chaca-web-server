import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidModelNameException extends HttpException {
  constructor(name: string) {
    super(`${name} is not valid for a dataset-model`, HttpStatus.CONFLICT);
  }
}
