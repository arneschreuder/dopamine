import { Injectable, Logger } from '@nestjs/common';
import * as util from 'util';
import { Cache } from '../models/cache.model';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheRepository {
  private readonly logger = new Logger(CacheRepository.name);

  constructor(private service: CacheService) {}

  async get(key: string) {
    this.logger.debug(util.inspect(key));
    this.logger.debug('HEREERERERERERER');

    return await this.service
      .get(key)
      .then((value) => {
        this.logger.debug('HERE WE GO');
        console.log(value);
        return value;
      })
      .then((value) => (value ? new Cache(key, value) : null));
  }

  async set(key: string, value: string): Promise<Cache> {
    this.logger.debug(util.inspect(key));
    this.logger.debug(util.inspect(value));

    return await this.service
      .set(key, value)
      .then((value) => (value ? new Cache(key, value) : null));
  }

  async delete(key: string): Promise<Cache> {
    this.logger.debug(util.inspect(key));

    return await this.service
      .delete(key)
      .then((value) => (value ? new Cache(key, value) : null));
  }

  async reset(): Promise<void> {
    return await this.service.reset();
  }
}
