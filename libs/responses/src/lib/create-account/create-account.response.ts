import { IAccount } from '@dopamine/interfaces';

export class CreateAccountResponse {
  constructor(public readonly account: IAccount) {}
}
