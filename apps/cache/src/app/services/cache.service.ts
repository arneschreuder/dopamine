import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as util from 'util';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<string> {
    this.logger.debug(util.inspect(key));
    this.logger.debug('HERE WE GO');
    this.logger.debug(this.cacheManager.get('another'));
    this.logger.debug('HERE WE GO');
    // return await this.cacheManager.get<string>(key);
    return Promise.resolve('This is a test');
  }

  async set(key: string, value: string): Promise<string> {
    this.logger.debug(util.inspect(key));
    return this.cacheManager.set<string>(key, value);
  }

  async delete(key: string) {
    this.logger.debug(util.inspect(key));
    return await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    return await this.cacheManager.reset();
  }
}
