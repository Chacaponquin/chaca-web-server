export class ChacaFileError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
