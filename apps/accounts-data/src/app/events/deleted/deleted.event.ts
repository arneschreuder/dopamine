import { Account } from '../../models/account.model';

export class DeletedEvent {
  constructor(public readonly account: Account) {}
}
