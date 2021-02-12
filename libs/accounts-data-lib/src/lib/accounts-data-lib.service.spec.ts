import { Test } from '@nestjs/testing';
import { AccountsDataLibService } from './accounts-data-lib.service';

describe('AccountsDataLibService', () => {
  let service: AccountsDataLibService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AccountsDataLibService],
    }).compile();

    service = module.get(AccountsDataLibService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
