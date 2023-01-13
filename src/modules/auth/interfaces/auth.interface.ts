export interface JwtPayload {
  userID: string;
}

export interface IReturnUser {
  username: string;
  isSuperUser: boolean;
  image: string | null;
  limitDatasets: number;
  limitDocuments: number;
}
