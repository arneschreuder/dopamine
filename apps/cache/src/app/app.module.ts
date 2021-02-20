import { CacheModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CACHE_MODULE_OPTIONS } from './app.config';
import { AppController } from './app.controller';
import {
  COMMAND_HANDLERS,
  EVENT_HANDLERS,
  QUERY_HANDLERS,
} from './app.handlers';
import { CacheRepository } from './repository/cache.repository';
import { CacheService } from './services/cache.service';

@Module({
  imports: [CacheModule.register(CACHE_MODULE_OPTIONS), CqrsModule],
  controllers: [AppController],
  providers: [
    CacheRepository,
    CacheService,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    ...QUERY_HANDLERS,
  ],
})
export class AppModule {}
