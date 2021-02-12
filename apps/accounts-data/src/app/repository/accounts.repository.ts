import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.model';
import { AccountRequest } from '../requests/account.request';
import { AccountsRequest } from '../requests/accounts.request';
import { CreateRequest } from '../requests/create.request';
import { account } from './fixtures/account';

@Injectable()
export class AccountsRepository {
  async account(req: AccountRequest): Promise<Account> {
    if (req.id) {
      if (req.id && req.id == account.id) {
        return account;
      }
    } else if (req.email) {
      if (req.email && req.email == account.email) {
        return account;
      }
    }

    return null;
  }

  async accounts(req: AccountsRequest): Promise<Account[]> {
    return [account];
  }

  async create(req: CreateRequest): Promise<Account> {
    return new Account({
      id: '?',
      email: req.email,
    });
  }
}
