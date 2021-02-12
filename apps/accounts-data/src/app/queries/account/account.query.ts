import { AccountRequest } from '../../requests/account.request';

export class AccountQuery {
  constructor(public readonly req: AccountRequest) {}
}
