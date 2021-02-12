import { CreateRequest } from '../../requests/create.request';

export class CreateCommand {
  constructor(public readonly req: CreateRequest) {}
}
