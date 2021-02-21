import { AccountDTO } from '@dopamine/dtos';
import { IAccount } from '@dopamine/interfaces';
import {
  CreateAccountRequest,
  DeleteAccountRequest,
  UpdateAccountRequest,
} from '@dopamine/requests';
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
import * as util from 'util';
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

  constructor(dto: AccountDTO) {
    super();
    this.logger.debug(util.inspect(dto));
    this.id = dto.id;
    this.authenticationId = dto.authenticationId;
    this.handle = dto.handle;
    this.description = dto.description;
    this.created = dto.created;
  }

  create(request: CreateAccountRequest): void {
    this.logger.debug(util.inspect(request));
    this.id = uuidv4();
    this.authenticationId = request.authenticationId;
    this.handle = request.handle;
    this.created = new Date();
    this.apply(new AccountCreatedEvent(this));
  }

  delete(request: DeleteAccountRequest): void {
    this.logger.debug(util.inspect(request));
    this.id = request.id;
    this.apply(new AccountDeletedEvent(this));
  }

  update(request: UpdateAccountRequest) {
    this.id = request.id;
    this.handle = request.handle;
    this.description = request.description;
    this.apply(new AccountUpdatedEvent(this));
  }
}
