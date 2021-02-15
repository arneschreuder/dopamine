import { PrismaLibModule } from '@dopamine/prisma-lib';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import {
  COMMAND_HANDLERS,
  EVENT_HANDLERS,
  QUERY_HANDLERS,
} from './app.handlers';
import { AccountsRepository } from './repository/accounts.repository';
import { AccountsService } from './services/accounts.service';

@Module({
  imports: [CqrsModule, PrismaLibModule],
  controllers: [AppController],
  providers: [
    AccountsRepository,
    AccountsService,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    ...QUERY_HANDLERS,
  ],
})
export class AppModule {}
