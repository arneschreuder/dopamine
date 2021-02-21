import { IAccount } from '@dopamine/interfaces';

export class DeleteAccountResponse {
  constructor(public readonly account: IAccount) {}
}
