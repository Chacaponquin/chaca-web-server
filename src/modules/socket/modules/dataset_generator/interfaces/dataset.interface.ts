export interface ReturnDataset {
  id: string;
  name: string;
  documents: Array<{
    [key: string]: unknown | unknown[];
  }>;
}
