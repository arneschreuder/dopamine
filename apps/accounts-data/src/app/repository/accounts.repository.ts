import { PrismaService } from '@dopamine/prisma-lib';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as util from 'util';
import { IAccount } from '../interfaces/account.interface';
import { Account } from '../models/account.model';

@Injectable()
export class AccountsRepository {
  private readonly logger = new Logger(AccountsRepository.name);

  constructor(private prisma: PrismaService) {}

  async account(
    accountWhereUniqueInput: Prisma.AccountWhereUniqueInput
  ): Promise<Account | null> {
    this.logger.debug(util.inspect(accountWhereUniqueInput));
    return this.prisma.account
      .findUnique({
        where: accountWhereUniqueInput,
      })
      .then((record) => (record ? new Account(record as IAccount) : null));
  }

  async accounts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AccountWhereUniqueInput;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByInput;
  }): Promise<Account[]> {
    this.logger.debug(util.inspect(params));
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.account
      .findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      .then((records) =>
        records.map((record) => new Account(record as IAccount))
      );
  }

  async create(data: Prisma.AccountCreateInput): Promise<Account> {
    this.logger.debug(util.inspect(data));
    return this.prisma.account
      .create({
        data,
      })
      .then((record) => (record ? new Account(record as IAccount) : null));
  }

  async update(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    this.logger.debug(util.inspect(params));
    const { where, data } = params;
    return this.prisma.account
      .update({
        data,
        where,
      })
      .then((record) => (record ? new Account(record as IAccount) : null));
  }

  async delete(where: Prisma.AccountWhereUniqueInput): Promise<Account> {
    return this.prisma.account
      .delete({
        where,
      })
      .then((record) => (record ? new Account(record as IAccount) : null));
  }
}
