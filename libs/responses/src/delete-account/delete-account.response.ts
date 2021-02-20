import { Account } from '@dopamine/models';

export class DeleteAccountResponse {
  constructor(public readonly account: Account) {}
}
