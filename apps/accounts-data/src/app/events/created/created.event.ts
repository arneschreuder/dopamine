import { Account } from '../../models/account.model';

export class CreatedEvent {
  constructor(public readonly account: Account) {}
}
