import { Account } from '@dopamine/models';
import { PrismaService } from '@dopamine/services';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as util from 'util';

@Injectable()
export class ContentDBRepository {
  private readonly logger = new Logger(ContentDBRepository.name);

  constructor(private prisma: PrismaService) {}

  async account(
    where: Prisma.AccountWhereUniqueInput
  ): Promise<Account | null> {
    this.logger.debug(util.inspect(where));
    return await this.prisma.account
      .findUnique({ where })
      .then((account) => (account ? new Account(account) : null));
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
    return await this.prisma.account
      .findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      .then((accounts) => accounts.map((account) => new Account(account)));
  }

  async createAccount(
    data: Prisma.AccountCreateInput
  ): Promise<Account | null> {
    this.logger.debug(util.inspect(data));
    return await this.prisma.account
      .create({ data })
      .then((account) => (account ? new Account(account) : null));
  }

  async updateAccount(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account | null> {
    this.logger.debug(util.inspect(params));
    const { where, data } = params;
    return await this.prisma.account
      .update({
        data,
        where,
      })
      .then((account) => (account ? new Account(account) : null));
  }

  async deleteAccount(
    where: Prisma.AccountWhereUniqueInput
  ): Promise<Account | null> {
    return await this.prisma.account
      .delete({
        where,
      })
      .then((account) => (account ? new Account(account) : null));
  }
}
