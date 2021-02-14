import { PrismaLibModule } from '@dopamine/prisma-lib';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { COMMAND_HANDLERS, QUERY_HANDLERS } from './app.handlers';
import { AccountsRepository } from './repository/accounts.repository';

@Module({
  imports: [CqrsModule, PrismaLibModule],
  controllers: [AppController],
  providers: [AccountsRepository, ...COMMAND_HANDLERS, ...QUERY_HANDLERS],
})
export class AppModule {}
