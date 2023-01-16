export class ChacaDatasetError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = "Chaca Dataset Error";
  }
}
