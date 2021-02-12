import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as util from 'util';
import { IAccount } from '../interfaces/account.interface';

export class Account extends AggregateRoot implements IAccount {
  private readonly logger = new Logger(Account.name);

  id: string;
  email: string;

  constructor(dto: IAccount) {
    super();
    this.logger.debug(util.inspect(dto));
    this.id = dto.id;
    this.email = dto.email;
  }
}
