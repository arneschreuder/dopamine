import { Account } from '../../models/account.model';

export class AccountDeletedEvent {
  constructor(public readonly account: Account) {}
}
