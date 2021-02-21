import { IAccount } from '@dopamine/interfaces';

export class AccountDeletedEvent {
  constructor(public readonly account: IAccount) {}
}
