import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Account as AccountRecord } from '@prisma/client';
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
import { CreatedEvent } from '../events/created/created.event';
import { DeletedEvent } from '../events/deleted/deleted.event';
import { UpdatedEvent } from '../events/updated/updated.event';
import { CreateRequest, DeleteRequest, UpdateRequest } from '../requests';

export class Account extends AggregateRoot implements AccountRecord {
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

  constructor(record?: AccountRecord) {
    super();
    this.logger.debug(util.inspect(record));

    if (record) {
      this.id = record.id;
      this.authenticationId = record.authenticationId;
      this.handle = record.handle;
      this.description = record.description;
      this.created = record.created;
    }
  }

  create({ authenticationId, handle }: CreateRequest) {
    this.logger.debug(util.inspect(authenticationId));
    this.logger.debug(util.inspect(handle));
    this.id = uuidv4();
    this.authenticationId = authenticationId;
    this.handle = handle;
    this.created = new Date();
    this.apply(new CreatedEvent(this));
  }

  delete({ id }: DeleteRequest) {
    this.logger.debug('HERE WE START');
    console.log('HERE WE START');
    this.logger.debug(util.inspect(id));
    this.logger.debug('HERE WE END');
    this.id = id;
    this.apply(new DeletedEvent(this));
  }

  update({ id, handle, description }: UpdateRequest) {
    this.logger.debug(util.inspect(id));
    this.logger.debug(util.inspect(handle));
    this.logger.debug(util.inspect(description));
    this.id = id;
    this.handle = handle;
    this.description = description;
    this.apply(new UpdatedEvent(this));
  }
}
