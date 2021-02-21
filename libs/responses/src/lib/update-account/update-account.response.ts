import { IAccount } from '@dopamine/interfaces';

export class UpdateAccountResponse {
  constructor(public readonly account: IAccount) {}
}
