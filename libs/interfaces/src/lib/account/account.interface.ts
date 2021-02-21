export interface IAccount {
  id: string;
  authenticationId: string;
  handle: string;
  description: string | null;
  created: Date;
}
