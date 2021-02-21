import { DeleteAccountRequest } from '@dopamine/requests';

export class DeleteAccountCommand {
  constructor(public readonly request: DeleteAccountRequest) {}
}
