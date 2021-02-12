import { Test } from '@nestjs/testing';
import { AccountsDataClientService } from './accounts-data-client.service';

describe('AccountsDataClientService', () => {
  let service: AccountsDataClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AccountsDataClientService],
    }).compile();

    service = module.get(AccountsDataClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
