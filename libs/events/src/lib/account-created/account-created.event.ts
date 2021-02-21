import { IAccount } from '@dopamine/interfaces';

export class AccountCreatedEvent {
  constructor(public readonly account: IAccount) {}
}
