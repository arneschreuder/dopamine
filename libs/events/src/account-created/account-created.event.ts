import { Account } from '../../models/account.model';

export class AccountCreatedEvent {
  constructor(public readonly account: Account) {}
}
