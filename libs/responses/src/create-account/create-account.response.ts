import { Account } from '@dopamine/models';

export class CreateAccountResponse {
  constructor(public readonly account: Account) {}
}
