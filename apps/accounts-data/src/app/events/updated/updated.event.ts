import { Account } from '../../models/account.model';

export class UpdatedEvent {
  constructor(public readonly account: Account) {}
}
