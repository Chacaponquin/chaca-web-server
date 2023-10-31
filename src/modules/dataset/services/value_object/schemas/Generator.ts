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
  protected gen(func: () => any) {
    try {
      return func();
    } catch (error) {
      if (error instanceof NotExistFieldError) {
        throw new DatasetNotExistFieldError({
          field: error.fieldRoute,
          refField: error.refFieldRoute,
        });
      } else if (error instanceof TryRefANoKeyFieldError) {
        throw new DatasetRefNotKeyFieldError({
          field: error.fieldRoute.join("."),
        });
      } else if (error instanceof CyclicAccessDataError) {
        throw new DatasetCyclicAccessError({ message: error.message });
      } else if (error instanceof EmptySequentialValuesError) {
        throw new DatasetEmptySequentialFieldError({ field: error.fieldRoute });
      } else if (error instanceof NotEnoughValuesForRefError) {
        throw new DatasetNotEnoughValuesForRefError({
          refField: error.refFieldRoute,
          keyField: error.keyFieldRoute,
        });
      } else {
        throw error;
      }
    }
  }
}
