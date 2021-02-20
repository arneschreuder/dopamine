import { ResetRequest } from '../../requests/reset.request';

export class ResetCommand {
  constructor(public readonly request: ResetRequest) {}
}
