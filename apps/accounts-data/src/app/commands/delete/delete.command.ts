import { DeleteRequest } from '../../requests/delete.request';

export class DeleteCommand {
  constructor(public readonly req: DeleteRequest) {}
}
