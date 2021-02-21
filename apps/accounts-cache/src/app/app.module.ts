import { Module } from '@nestjs/common';
import { AccountsCacheModule } from './accounts-cache/accounts-cache.module';
import { AppController } from './app.controller';

@Module({
  imports: [AccountsCacheModule],
  controllers: [AppController],
})
export class AppModule {}
