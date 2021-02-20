import { PrismaModule } from '@dopamine/prisma';
import { AccountsDataRepository } from '@dopamine/repositories';
import { AccountsDataService } from '@dopamine/services';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import {
  COMMAND_HANDLERS,
  EVENT_HANDLERS,
  QUERY_HANDLERS,
} from './app.handlers';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AccountsDataRepository,
    AccountsDataService,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    ...QUERY_HANDLERS,
  ],
})
export class AppModule {}
