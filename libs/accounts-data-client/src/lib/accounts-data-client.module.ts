import { Module } from '@nestjs/common';
import { AccountsDataClientService } from './accounts-data-client.service';

@Module({
  controllers: [],
  providers: [AccountsDataClientService],
  exports: [AccountsDataClientService],
})
export class AccountsDataClientModule {}
