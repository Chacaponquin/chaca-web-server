import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectFileExportFormatException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
