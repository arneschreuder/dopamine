import { Account } from '../../models';

export class AccountUpdatedEvent {
  constructor(public readonly account: Account) {}
}
