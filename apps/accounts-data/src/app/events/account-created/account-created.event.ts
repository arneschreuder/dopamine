import { Account } from '../../models';

export class AccountCreatedEvent {
  constructor(public readonly account: Account) {}
}
