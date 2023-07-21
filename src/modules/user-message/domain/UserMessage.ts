export type UserMessageParams = {
  id: string;
  name: string;
  userEmail: string;
  message: string;
};

export class UserMessage {
  public id: string;
  public name: string;
  public userEmail: string;
  public message: string;

  constructor({ id, message, name, userEmail }: UserMessageParams) {
    this.id = id;
    this.message = message;
    this.userEmail = userEmail;
    this.name = name;
  }
}
