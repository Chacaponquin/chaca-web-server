export interface JwtPayload {
  userID: string;
}

export interface ReturnUser {
  username: string;
  isSuperUser: boolean;
  image: string | null;
  limitDatasets: number;
  limitDocuments: number;
}
