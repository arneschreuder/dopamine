import { CreateRequest } from '../../requests/create.request';

export class CreateAccountCommand {
  constructor(public readonly request: CreateRequest) {}
}
