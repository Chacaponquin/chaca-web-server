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
  constructor(msg: T, status: DATASETS_ERROR_HTTP_STATUS) {
    super(msg as Record<string, string>, status);
  }
}

export class DatasetNotExistFieldError extends DatasetCreationError<NotExistFieldErrorProps> {
  constructor(msg: NotExistFieldErrorProps) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.NOT_EXIST_FIELD);
  }
}

export class DatasetRefNotKeyFieldError extends DatasetCreationError<TryRefNotKeyFieldProps> {
  constructor(msg: TryRefNotKeyFieldProps) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.REF_NOT_KEY);
  }
}

export class DatasetCyclicAccessError extends DatasetCreationError<CycleDataErrorProps> {
  constructor(msg: CycleDataErrorProps) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.CYCLIC);
  }
}

export class DatasetEmptySequentialFieldError extends DatasetCreationError<EmptySequentialErrorProps> {
  constructor(msg: EmptySequentialErrorProps) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.EMPTY_SEQUENTIAL);
  }
}

export class DatasetNotEnoughValuesForRefError extends DatasetCreationError<NotEnoughValuesForRefErrorProps> {
  constructor(msg: NotEnoughValuesForRefErrorProps) {
    super(msg, DATASETS_ERROR_HTTP_STATUS.NOT_ENOUGH_VALUES_REF);
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
