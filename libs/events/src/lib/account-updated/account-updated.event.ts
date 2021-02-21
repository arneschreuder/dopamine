import { IAccount } from '@dopamine/interfaces';

export class AccountUpdatedEvent {
  constructor(public readonly account: IAccount) {}
}
