import { IUpdateAccountRequest } from '@dopamine/requests';

export class UpdateAccountCommand {
  constructor(public readonly request: IUpdateAccountRequest) {}
}
