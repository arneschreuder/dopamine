import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

// TODO: Read from env variables
export const CACHE_MODULE_OPTIONS: CacheModuleOptions = {
  store: redisStore,
  host: 'localhost',
  port: 6379,
  password: 'dopamine',
  ttl: 600, // 600s = 10mins
};
