import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as util from 'util';
import { IAccount } from '../interfaces/account.interface';

export class Account extends AggregateRoot implements IAccount {
  id: string;
  authenticationId: string;
  handle: string;
  description: string;
  created: Date;

  private readonly logger = new Logger(Account.name);

  constructor(dto: IAccount) {
    super();
    this.logger.debug(util.inspect(dto));
    this.id = dto.id;
    this.authenticationId = dto.authenticationId;
    this.handle = dto.handle;
    this.description = dto.description;
    this.created = dto.created;
  }
}
