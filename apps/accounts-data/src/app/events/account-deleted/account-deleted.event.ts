import { Account } from '../../models';

export class AccountDeletedEvent {
  constructor(public readonly account: Account) {}
}
