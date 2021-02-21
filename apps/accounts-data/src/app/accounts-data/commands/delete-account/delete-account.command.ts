import { IDeleteAccountRequest } from '@dopamine/requests';

export class DeleteAccountCommand {
  constructor(public readonly request: IDeleteAccountRequest) {}
}
