import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { IsString } from 'class-validator';
import * as util from 'util';
import { DeletedEvent } from '../events/deleted/deleted.event';
import { ResetEvent } from '../events/reset/reset.event';
import { SetEvent } from '../events/set/set.event';
import { DeleteRequest, SetRequest } from '../requests';

export class Cache extends AggregateRoot {
  @IsString()
  key: string;

  @IsString()
  value: string;

  private readonly logger = new Logger(Cache.name);

  constructor(key?: string, value?: string) {
    super();
    this.logger.debug(util.inspect(key));
    this.logger.debug(util.inspect(value));

    if (key) {
      this.key = key;

      if (value) {
        this.value = value;
      }
    }
  }

  set({ key, value }: SetRequest) {
    this.logger.debug(util.inspect(key));
    this.logger.debug(util.inspect(value));
    this.key = key;
    this.value = value;
    this.apply(new SetEvent(this));
  }

  delete({ key }: DeleteRequest) {
    this.logger.debug(util.inspect(key));
    this.key = key;
    this.apply(new DeletedEvent(this));
  }

  reset() {
    this.apply(new ResetEvent());
  }
}
