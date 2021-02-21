import { IAccount } from '@dopamine/interfaces';

export class AccountDTO implements IAccount {
  private data: IAccount;

  get id(): string {
    return this.data.id;
  }

  get authenticationId(): string {
    return this.data.authenticationId;
  }

  get handle(): string {
    return this.data.handle;
  }

  get description(): string {
    return this.data.description;
  }

  get created(): Date {
    return this.data.created;
  }

  constructor(data: IAccount) {
    this.data = data;
  }
}
