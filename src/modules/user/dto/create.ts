export interface CreateSimpleUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface CreateGithubUserDTO {
  username: string;
  picture: string | null;
  email: string;
}

export interface CreateGoogleUserDTO {
  picture: string | null;
  username: string;
  email: string;
}
