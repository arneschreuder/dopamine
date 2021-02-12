import { ICreateDTO } from '@dopamine/accounts-data-lib';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    let dto: ICreateDTO;

    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    beforeEach(async () => {
      dto = {
        email: 'test@test.com',
        password: 'test123',
      };
    });

    it('should create an account', () => {
      const account = controller.create(dto);
      expect(account).toBeTruthy();
      // This must be enabled when IAccount becomes a class
      // expect(account).toBeInstanceOf(IAccount);
    });
  });
});
