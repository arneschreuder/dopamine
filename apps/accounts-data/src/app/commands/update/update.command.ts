import { UpdateRequest } from '../../requests/update.request';

export class UpdateCommand {
  constructor(public readonly request: UpdateRequest) {}
}
