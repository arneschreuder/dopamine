import { PrismaService } from '@dopamine/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import * as util from 'util';

@Injectable()
export class AccountsDataService {
  private readonly logger = new Logger(AccountsDataService.name);

  constructor(private prisma: PrismaService) {}

  async account(
    accountWhereUniqueInput: Prisma.AccountWhereUniqueInput
  ): Promise<Account | null> {
    this.logger.debug(util.inspect(accountWhereUniqueInput));
    return await this.prisma.account.findUnique({
      where: accountWhereUniqueInput,
    });
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
    return await this.prisma.account.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.AccountCreateInput): Promise<Account> {
    this.logger.debug(util.inspect(data));
    return await this.prisma.account.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    this.logger.debug(util.inspect(params));
    const { where, data } = params;
    return await this.prisma.account.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.AccountWhereUniqueInput): Promise<Account> {
    return await this.prisma.account.delete({
      where,
    });
  }
}
