export interface ReturnDataset<T> {
  id: string;
  name: string;
  documents: Array<{
    [key: string]: T | T[];
  }>;
}
