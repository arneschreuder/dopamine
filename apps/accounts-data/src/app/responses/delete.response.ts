import { Account } from '../models/account.model';

export class DeleteResponse {
  constructor(public readonly account: Account) {}
}
