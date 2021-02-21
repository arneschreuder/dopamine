import { AccountDTO } from '@dopamine/dtos';
import { IAccount } from '@dopamine/interfaces';
import { PrismaService } from '@dopamine/services';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as util from 'util';

@Injectable()
export class AccountsDataService {
  private readonly logger = new Logger(AccountsDataService.name);

  constructor(private prisma: PrismaService) {}

  async account(where: Prisma.AccountWhereUniqueInput): Promise<AccountDTO> {
    this.logger.debug(util.inspect(where));
    return await this.prisma.account
      .findUnique({ where })
      .then((account) => new AccountDTO(account as IAccount));
  }

  async accounts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AccountWhereUniqueInput;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByInput;
  }): Promise<AccountDTO[]> {
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
      .then((accounts) =>
        accounts.map((account) => new AccountDTO(account as IAccount))
      );
  }

  async create(data: Prisma.AccountCreateInput): Promise<AccountDTO> {
    this.logger.debug(util.inspect(data));
    return await this.prisma.account
      .create({ data })
      .then((account) => new AccountDTO(account as IAccount));
  }

  async update(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<AccountDTO> {
    this.logger.debug(util.inspect(params));
    const { where, data } = params;
    return await this.prisma.account
      .update({
        data,
        where,
      })
      .then((account) => new AccountDTO(account as IAccount));
  }

  async delete(where: Prisma.AccountWhereUniqueInput): Promise<AccountDTO> {
    return await this.prisma.account
      .delete({
        where,
      })
      .then((account) => new AccountDTO(account as IAccount));
  }
}
