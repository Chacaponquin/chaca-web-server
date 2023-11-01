import {
  DatasetCyclicAccessError,
  DatasetEmptySequentialFieldError,
  DatasetNotEnoughValuesForRefError,
  DatasetNotExistFieldError,
  DatasetRefNotKeyFieldError,
} from "@modules/dataset/exceptions/dataset";
import {
  CyclicAccessDataError,
  EmptySequentialValuesError,
  NotEnoughValuesForRefError,
  NotExistFieldError,
  TryRefANoKeyFieldError,
} from "chaca";

export abstract class Generator {
  protected async gen(func: () => unknown): Promise<unknown> {
    try {
      return await func();
    } catch (error) {
      if (error instanceof NotExistFieldError) {
        throw new DatasetNotExistFieldError(
          {
            field: error.fieldRoute,
            refField: error.refFieldRoute,
          },
          error.message,
        );
      } else if (error instanceof TryRefANoKeyFieldError) {
        throw new DatasetRefNotKeyFieldError(
          {
            field: error.fieldRoute,
          },
          error.message,
        );
      } else if (error instanceof CyclicAccessDataError) {
        throw new DatasetCyclicAccessError(
          { message: error.message },
          error.message,
        );
      } else if (error instanceof EmptySequentialValuesError) {
        throw new DatasetEmptySequentialFieldError(
          { field: error.fieldRoute },
          error.message,
        );
      } else if (error instanceof NotEnoughValuesForRefError) {
        throw new DatasetNotEnoughValuesForRefError(
          {
            refField: error.refFieldRoute,
            keyField: error.keyFieldRoute,
          },
          error.message,
        );
      } else {
        throw error;
      }
    }
  }
}
