import { Module } from '@nestjs/common';
import { AccountsDataModule } from './accounts-data/accounts-data.module';
import { AppController } from './app.controller';

@Module({
  imports: [AccountsDataModule],
  controllers: [AppController],
})
export class AppModule {}
