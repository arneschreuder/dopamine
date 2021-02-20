import { UpdateRequest } from '../../requests/update.request';

export class UpdateAccountCommand {
  constructor(public readonly request: UpdateRequest) {}
}
