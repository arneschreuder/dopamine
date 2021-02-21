import { CreateAccountRequest } from '@dopamine/requests';

export class CreateAccountCommand {
  constructor(public readonly request: CreateAccountRequest) {}
}
