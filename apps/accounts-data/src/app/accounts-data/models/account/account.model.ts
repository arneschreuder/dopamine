import { IAccount } from '@dopamine/models';
import { IUpdateAccountRequest } from '@dopamine/requests';
import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { AccountCreatedEvent } from '../../events/account-created/account-created.event';
import { AccountDeletedEvent } from '../../events/account-deleted/account-deleted.event';
import { AccountUpdatedEvent } from '../../events/account-updated/account-updated.event';

export class Account extends AggregateRoot implements IAccount {
  @IsUUID('4')
  id: string;

  @IsUUID('4')
  authenticationId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(128)
  handle: string;

  @IsString()
  @MinLength(3)
  @MaxLength(128)
  @IsOptional()
  description: string;

  @IsDate()
  created: Date;

  private readonly logger = new Logger(Account.name);

  constructor(account: IAccount) {
    super();
    this.id = account.id || uuidv4();
    this.authenticationId = account.authenticationId;
    this.handle = account.handle;
    this.description = account.description;
    this.created = account.created || new Date();
  }

  create(): void {
    this.apply(new AccountCreatedEvent(this));
  }

  delete(): void {
    this.apply(new AccountDeletedEvent(this));
  }

  update(request: IUpdateAccountRequest) {
    this.handle = request.handle || this.handle;
    this.description = request.description || this.description;
    this.apply(new AccountUpdatedEvent(this));
  }
}
