import { Cache } from '../../models/cache.model';

export class DeletedEvent {
  constructor(public readonly cache: Cache) {}
}
