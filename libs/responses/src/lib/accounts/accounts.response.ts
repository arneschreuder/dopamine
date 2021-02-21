import { IAccount } from '@dopamine/interfaces';

export class AccountsResponse {
  constructor(public readonly accounts: IAccount[]) {}
}
