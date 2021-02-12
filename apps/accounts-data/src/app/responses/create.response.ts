import { Account } from '../models/account.model';

export class CreateResponse {
  constructor(public readonly account: Account) {}
}
