import { Cache } from '../../models/cache.model';

export class SetEvent {
  constructor(public readonly cache: Cache) {}
}
