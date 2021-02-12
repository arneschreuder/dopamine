import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import {
  COMMAND_HANDLERS,
  EVENT_HANDLERS,
  QUERY_HANDLERS,
} from './app.handlers';
import { AccountsRepository } from './repository/accounts.repository';
import { AccountsSagas } from './sagas/accounts.sagas';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AccountsRepository,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    ...EVENT_HANDLERS,
    AccountsSagas,
  ],
})
export class AppModule {}
