import { Test, TestingModule } from '@nestjs/testing';
import { DerslerController } from './dersler.controller';
import { DerslerService } from './dersler.service';

describe('DerslerController', () => {
  let controller: DerslerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DerslerController],
      providers: [DerslerService],
    }).compile();

    controller = module.get<DerslerController>(DerslerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
