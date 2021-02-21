import { PrismaService } from '@dopamine/services';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import {
  COMMAND_HANDLERS,
  EVENT_HANDLERS,
  QUERY_HANDLERS,
} from './app.handlers';
import { AccountsDataRepository } from './repositories';
import { AccountsDataService } from './services';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AccountsDataRepository,
    AccountsDataService,
    PrismaService,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    ...QUERY_HANDLERS,
  ],
})
export class AppModule {}
