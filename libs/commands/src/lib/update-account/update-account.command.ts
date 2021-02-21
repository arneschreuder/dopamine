import { UpdateAccountRequest } from '@dopamine/requests';

export class UpdateAccountCommand {
  constructor(public readonly request: UpdateAccountRequest) {}
}
