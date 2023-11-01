import { HttpException, HttpStatus } from "@nestjs/common";
import {
  CycleDataErrorProps,
  EmptySequentialErrorProps,
  NotEnoughValuesForRefErrorProps,
  NotExistFieldErrorProps,
  TryRefNotKeyFieldProps,
} from "../dto/error";
import { DATASETS_ERROR_HTTP_STATUS } from "../constants/DATASETS_ERROR_HTTP_STATUS";

export abstract class DatasetCreationError<T> extends HttpException {
  constructor(
    public readonly content: T,
    public readonly code: DATASETS_ERROR_HTTP_STATUS,
    public readonly message: string,
  ) {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}

export class DatasetNotExistFieldError extends DatasetCreationError<NotExistFieldErrorProps> {
  constructor(msg: NotExistFieldErrorProps, message: string) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.NOT_EXIST_FIELD, message);
  }
}

export class DatasetRefNotKeyFieldError extends DatasetCreationError<TryRefNotKeyFieldProps> {
  constructor(msg: TryRefNotKeyFieldProps, message: string) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.REF_NOT_KEY, message);
  }
}

export class DatasetCyclicAccessError extends DatasetCreationError<CycleDataErrorProps> {
  constructor(msg: CycleDataErrorProps, message: string) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.CYCLIC, message);
  }
}

export class DatasetEmptySequentialFieldError extends DatasetCreationError<EmptySequentialErrorProps> {
  constructor(msg: EmptySequentialErrorProps, message: string) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.EMPTY_SEQUENTIAL, message);
  }
}

export class DatasetNotEnoughValuesForRefError extends DatasetCreationError<NotEnoughValuesForRefErrorProps> {
  constructor(msg: NotEnoughValuesForRefErrorProps, message: string) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.NOT_ENOUGH_VALUES_REF, message);
  }
}

export class RepeatDatasetNameException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectDatasetNameException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectDatasetLimitException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
