import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectDefinedFieldDataTypeException extends Error {}

export class IncorrectDatasetLimitException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectDatasetNameException extends Error {}

export class IncorrectFieldArrayConfigException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectFieldNameException extends Error {}

export class IncorrectFileExportFormatException extends Error {}
