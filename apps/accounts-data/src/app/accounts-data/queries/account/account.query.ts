import { IAccountRequest } from '@dopamine/requests';

export class AccountQuery {
  constructor(public readonly request: IAccountRequest) {}
}
