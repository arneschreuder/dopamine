import { DeleteRequest } from '../../requests/delete.request';

export class DeleteAccountCommand {
  constructor(public readonly request: DeleteRequest) {}
}
