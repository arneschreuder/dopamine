import { ICreateAccountRequest } from '@dopamine/requests';

export class CreateAccountCommand {
  constructor(public readonly request: ICreateAccountRequest) {}
}
