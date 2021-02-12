import { Module } from '@nestjs/common';
import { AccountsDataLibService } from './accounts-data-lib.service';

@Module({
  controllers: [],
  providers: [AccountsDataLibService],
  exports: [AccountsDataLibService],
})
export class AccountsDataLibModule {}
