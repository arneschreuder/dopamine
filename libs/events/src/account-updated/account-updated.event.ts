import { Account } from '../../models/account.model';

export class AccountUpdatedEvent {
  constructor(public readonly account: Account) {}
}
