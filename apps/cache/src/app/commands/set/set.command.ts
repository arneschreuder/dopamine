import { SetRequest } from '../../requests/set.request';

export class SetCommand {
  constructor(public readonly request: SetRequest) {}
}
