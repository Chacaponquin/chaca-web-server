export interface NotExistFieldErrorProps {
  field: string;
  refField: string;
}

export interface TryRefNotKeyFieldProps {
  field: string;
}

export interface CycleDataErrorProps {
  message: string;
}

export interface EmptySequentialErrorProps {
  field: string;
}

export interface NotEnoughValuesForRefErrorProps {
  refField: string;
  keyField: string;
}
