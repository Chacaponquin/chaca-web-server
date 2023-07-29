export class NotFoundOptionError extends Error {
  constructor(public readonly schema: string, public readonly option: string) {
    super(`The option '${option}' do not exists in the schema '${schema}'`);
  }
}

export class NotFoundSchemaError extends Error {
  constructor(public readonly schema: string) {
    super(`The schema '${schema}' do not exists`);
  }
}

export class InvalidOptionValueLimitException extends Error {}
